import {
  ParentComponent,
  createContext,
  createMemo,
  createSignal,
  useContext,
} from "solid-js";
import { AuthContextProps } from "../types/auth";

const AuthContext = createContext<AuthContextProps>();

const AuthProvider: ParentComponent = (props) => {
  const [username, setUsername] = createSignal<string>();
  const authenticated = createMemo(() => username() !== undefined);

  const values = createMemo<AuthContextProps>(() => ({
    username,
    authenticated,
    authenticate: (username: string) => setUsername(username),
  }));

  return (
    <AuthContext.Provider value={values()}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthState = () => {
  const authState = useContext(AuthContext);
  if (!authState)
    throw new Error("authState is only available within AuthProvider");
  return authState;
};
