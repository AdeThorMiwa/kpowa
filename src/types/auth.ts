import { Accessor } from "solid-js";
import { User } from "./user";

export interface AuthContextProps {
  user: Accessor<User | undefined>;
  authenticated: Accessor<boolean>;
  authenticate: (token: AuthToken) => void;
  logout: () => void;
}

export type AuthToken = String | undefined;
