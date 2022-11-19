import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Wrapper() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="bg-slate-900 flex-grow overflow-visible">
        <div className="max-w-[768px] mr-auto ml-auto flex flex-col pb-16">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
