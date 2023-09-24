import {
  ParentComponent,
  createContext,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { AuthContextProps, AuthToken } from "../types/auth";
import EventManager from "../lib/eventManager";
import { getAuthenticatedUser } from "../lib/api";
import { makePersisted } from "@solid-primitives/storage";
import { AUTH_STORAGE_KEY, AUTH_STORAGE_TYPE } from "../constants/auth";

const AuthContext = createContext<AuthContextProps>();

const fetchUser = async (token: AuthToken) => {
  if (!token) return;

  return await getAuthenticatedUser();
};

const AuthProvider: ParentComponent = (props) => {
  const [authToken, setAuthToken] = makePersisted(createSignal<AuthToken>(), {
    name: AUTH_STORAGE_KEY,
    storage: AUTH_STORAGE_TYPE,
  });
  const authenticated = createMemo(() => authToken() !== undefined);
  const [user] = createResource(authToken, fetchUser);

  createEffect(() => {
    if (authToken()) {
      EventManager.init(authToken());
    }
  });

  const authenticate = (token: AuthToken) => {
    setAuthToken(token);
  };

  const values = createMemo<AuthContextProps>(() => ({
    user,
    authenticated,
    authenticate,
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
