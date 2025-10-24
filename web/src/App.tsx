import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/home";
import { Login } from "./Pages/Login/login";
import { Dashboard } from "./Pages/Dashboard/dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} index />
          <Route element={<Login />} path="/login" />
          <Route element={<Dashboard />} path="/dashboard" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
