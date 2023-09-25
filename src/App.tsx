import { type Component } from "solid-js";
import AppRoutes from "./routes";
import AuthProvider from "./state/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Toaster } from "solid-toast";

const queryClient = new QueryClient();

const App: Component = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
