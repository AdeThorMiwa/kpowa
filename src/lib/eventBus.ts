import { EventBusEvent, EventBusEventType } from "../types/event";

class EventBus {
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

export default new EventBus();
