import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

import Main from "../layouts/Main";

const Auth = lazy(() => import("../pages/Auth"));
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<Auth />} />
        <Route path="/sign-in" element={<Auth />} />

        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
