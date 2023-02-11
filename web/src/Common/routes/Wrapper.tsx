import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function Wrapper() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-grow overflow-visible bg-slate-900">
        <div className="z-10 mr-auto ml-auto flex max-w-[768px] flex-col px-2 pb-16">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
