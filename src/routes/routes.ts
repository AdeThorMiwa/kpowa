import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth";
import { Route } from "../types/route";

import AllowAuthenticated from "../guards/AllowAuthenticated";
import AllowUnauthenticatedOnly from "../guards/AllowUnauthenticatedOnly";

const routes: Route<string>[] = [
  {
    path: "/",
    component: HomePage,
    guard: AllowAuthenticated,
  },
  {
    path: "/auth",
    component: AuthPage,
    guard: AllowUnauthenticatedOnly,
  },
];

export default routes;
