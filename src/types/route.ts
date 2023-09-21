import { RouteProps } from "@solidjs/router";
import { ParentComponent } from "solid-js";

export type Route<T extends string> = RouteProps<T> & {
  guard?: ParentComponent;
};
