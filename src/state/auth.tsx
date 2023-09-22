import {
  ParentComponent,
  createContext,
  createMemo,
  createSignal,
  useContext,
} from "solid-js";
import { AuthContextProps } from "../types/auth";
import { User } from "../types/user";

const AuthContext = createContext<AuthContextProps>();

const AuthProvider: ParentComponent = (props) => {
  const [user, setUser] = createSignal<User>();
  const authenticated = createMemo(() => user() !== undefined);

  const values = createMemo<AuthContextProps>(() => ({
    user,
    authenticated,
    authenticate: (user: User) => setUser(user),
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
