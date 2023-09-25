import { Route, Router, Routes } from "@solidjs/router";
import { Component, createEffect, onCleanup } from "solid-js";
import routes from "./routes";
import Fragment from "../components/Fragment";
import NotFoundPage from "../pages/NotFound";
import { useAuthState } from "../state/auth";
import { AppServerEventKind } from "../types/event";
import EventBus from "../lib/eventBus";
import toast from "solid-toast";

const AppRoutes: Component = () => {
  const { user } = useAuthState();
  const username = () => user()?.username;

  createEffect(() => {
    const unsubscribe = EventBus.subscribe<{ username: string }>(
      AppServerEventKind.NewLogin,
      (e) => {
        if (e.data?.username !== username()) {
          toast(`${e.data?.username} joined the server!`);
        }
      }
    );

    onCleanup(() => unsubscribe());
  });

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
