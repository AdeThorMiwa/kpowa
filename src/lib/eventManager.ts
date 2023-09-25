import { AuthToken } from "../types/auth";
import { AppServerEvent, AppServerEventKind } from "../types/event";

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
  public emit(evt: AppServerEvent) {
    const event = new CustomEvent(evt.type, { detail: evt.data });
    window.dispatchEvent(event);
  }

  public subscribe<T = any>(
    evt: AppServerEventKind,
    handler: (evt: AppServerEvent<T>) => void
  ) {
    window.addEventListener(evt, (e: any) =>
      handler({ data: e.detail, type: evt })
    );
  }

  public unsubscribe(
    evt: AppServerEventKind,
    handler: (evt: AppServerEvent) => void
  ) {
    window.removeEventListener(evt, (e: any) => handler(e.detail));
  }
}

const EventBus = new AppEventBus();

export { EventBus, AppEventManager };
