import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/home";
import { Login } from "./Pages/Login/login";
import { Dashboard } from "./Pages/Dashboard/dashboard";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} index />
        <Route element={<Login />} path="/login" />
        <Route element={<Dashboard />} path="/dashboard" />
      </Routes>
    </BrowserRouter>
  );
}
