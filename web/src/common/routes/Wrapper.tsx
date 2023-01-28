import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function Wrapper() {
  return (
    <div className="flex flex-col h-screen relative">
      <Header />
      <main className="flex-grow overflow-visible">
        <div className="px-2 max-w-[768px] mr-auto ml-auto flex flex-col pb-16 z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
