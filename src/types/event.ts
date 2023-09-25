export enum AppServerEventKind {
  NewLogin = "NewLogin",
  NewRegister = "NewRegister",
  NewReferral = "NewReferral",
}

export enum InAppEventKind {
  Logout = "Logout",
}

export type AppServerEvent<T = unknown> = {
  type: AppServerEventKind;
  data: T;
};

export type EventBusEventType = AppServerEventKind | InAppEventKind;

export type EventBusEvent<T = unknown> = {
  type: EventBusEventType;
  data?: T;
};
