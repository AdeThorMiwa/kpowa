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
import { AppEventManager, EventBus } from "../lib/eventManager";
import { getAuthenticatedUser } from "../lib/api";
import { makePersisted } from "@solid-primitives/storage";
import {
  APP_EVENTS,
  AUTH_STORAGE_KEY,
  AUTH_STORAGE_TYPE,
} from "../constants/auth";
import { createQuery } from "@tanstack/solid-query";
import { AppServerEventKind } from "../types/event";

const AuthContext = createContext<AuthContextProps>();

const AuthProvider: ParentComponent = (props) => {
  const [authToken, setAuthToken] = makePersisted(createSignal<AuthToken>(), {
    name: AUTH_STORAGE_KEY,
    storage: AUTH_STORAGE_TYPE,
  });
  const authenticated = createMemo(() => authToken() !== undefined);
  const query = createQuery(() => ["user"], getAuthenticatedUser, {
    get enabled() {
      return authToken() !== undefined;
    },
  });

  const authenticate = (token: AuthToken) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(undefined);
  };

  createEffect(() => {
    if (authToken()) {
      AppEventManager.init(authToken());
    }
  });

  createEffect(() => {
    window.addEventListener(APP_EVENTS.LOGOUT, () => logout());
  });

  createEffect(() => {
    EventBus.subscribe<{ referrer: string; referred_user: string }>(
      AppServerEventKind.NewReferral,
      (e) => {
        if (e.data.referrer === query.data?.username) {
          query.refetch();
        }
      }
    );
  });

  const values = createMemo<AuthContextProps>(() => ({
    user: () => query.data,
    authenticated,
    authenticate,
    logout,
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
