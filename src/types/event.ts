export enum AppServerEventKind {
  NewLogin,
  NewRegister,
  NewReferral,
}

export type AppServerEvent<T = unknown> = {
  type: AppServerEventKind;
  data: T;
};
