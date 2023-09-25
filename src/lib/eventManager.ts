import { AuthToken } from "../types/auth";
import EventBus from "./eventBus";

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

export default new EventManager();
