import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import Header from "../components/Header";

function Loader() {
  return <div className="bg-red-600">Loader</div>;
}

export default function Main() {
  return (
    <>
      <Header />
      <main className="w-full h-full flex flex-col">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
