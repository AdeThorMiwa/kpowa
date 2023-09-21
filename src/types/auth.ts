import { Accessor } from "solid-js";

export interface AuthContextProps {
  username: Accessor<string | undefined>;
  authenticated: Accessor<boolean>;
  authenticate: (username: string) => void;
}
