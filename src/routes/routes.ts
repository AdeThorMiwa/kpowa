import HomePage from "../pages/Home";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
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
    path: "/register",
    component: RegisterPage,
    guard: AllowUnauthenticatedOnly,
  },
  {
    path: "/login",
    component: LoginPage,
    guard: AllowUnauthenticatedOnly,
  },
];

export default routes;
