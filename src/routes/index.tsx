import { Route, Router, Routes } from "@solidjs/router";
import { Component } from "solid-js";
import routes from "./routes";
import Fragment from "../components/Fragment";
import NotFoundPage from "../pages/NotFound";

const AppRoutes: Component = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const Guard = route.guard || Fragment;

          // TODO: handle more sophisticated route paths
          return (
            <Route path="/" component={Guard}>
              <Route {...route} />
            </Route>
          );
        })}
        <Route path="*" component={NotFoundPage} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
