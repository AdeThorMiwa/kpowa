export enum AppServerEventKind {
  NewLogin = "NewLogin",
  NewRegister = "NewRegister",
  NewReferral = "NewReferral",
}

export type AppServerEvent<T = unknown> = {
  type: AppServerEventKind;
  data: T;
};
