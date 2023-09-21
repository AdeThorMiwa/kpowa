import { Route, Router, Routes } from "@solidjs/router";
import { Component } from "solid-js";
import routes from "./routes";

const AppRoutes: Component = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route {...route} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
