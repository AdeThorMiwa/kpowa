import type { Component } from "solid-js";
import AppRoutes from "./routes";
import AuthProvider from "./state/auth";

const App: Component = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
