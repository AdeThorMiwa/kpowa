import { Accessor } from "solid-js";
import { User } from "./user";

export interface AuthContextProps {
  user: Accessor<User | undefined>;
  authenticated: Accessor<boolean>;
  authenticate: (user: User) => void;
}
