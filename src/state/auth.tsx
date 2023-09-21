import {
  Component,
  ComponentProps,
  ParentComponent,
  createContext,
  createMemo,
  createSignal,
} from "solid-js";
import { AuthContextProps } from "../types/auth";

const AuthContext = createContext<AuthContextProps>();

const AuthProvider: ParentComponent = (props) => {
  const [username, setUsername] = createSignal<string>();

  const values = createMemo(() => ({
    username: username(),
    authenticate: (username: string) => setUsername(username),
  }));

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
