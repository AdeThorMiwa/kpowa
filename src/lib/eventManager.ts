import { AuthToken } from "../types/auth";
import { AppServerEvent } from "../types/event";

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
    this.eventSource!.onerror = this.onErrorHandler;
  }

  private onMessageHandler(e: MessageEvent<AppServerEvent>) {
    console.log("new message: ", e.data);
  }

  private onErrorHandler(e: Event) {
    console.log("error: ", e);
  }
}

export default new EventManager();
