import { AuthToken } from "../types/auth";
import { EventBusEvent, EventBusEventType } from "../types/event";

const Window = window as any;

class EventManager {
  private readonly eventStreamUrl = "http://localhost:8009/stream";
  private eventSource: EventSource | undefined;
  private initialized = false;

  public init(token: AuthToken) {
    if (this.initialized) return;

    this.eventSource = new Window.EventSourcePolyfill(this.eventStreamUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.initialized = true;

    this.eventSource!.onmessage = this.onMessageHandler;
  }

  private onMessageHandler(e: MessageEvent<string>) {
    EventBus.emit(JSON.parse(e.data));
  }
}

const AppEventManager = new EventManager();

class AppEventBus {
  public emit(evt: EventBusEvent) {
    const event = new CustomEvent(evt.type, { detail: evt.data });
    window.dispatchEvent(event);
  }

  public subscribe<T = any>(
    evt: EventBusEventType,
    handler: (evt: EventBusEvent<T>) => void
  ) {
    window.addEventListener(evt, (e: any) =>
      handler({ data: e.detail, type: evt })
    );

    return this.unsubscribe(evt, handler);
  }

  private unsubscribe<T = any>(
    evt: EventBusEventType,
    handler: (evt: EventBusEvent<T>) => void
  ) {
    return () => window.removeEventListener(evt, (e: any) => handler(e.detail));
  }
}

const EventBus = new AppEventBus();

export { EventBus, AppEventManager };
