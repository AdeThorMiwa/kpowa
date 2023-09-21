import { RouteProps } from "@solidjs/router";
import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth";

const routes: RouteProps<string>[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/auth",
    component: AuthPage,
  },
];

export default routes;
