import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export interface WrapperProps {
  children: ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="bg-slate-900 flex-grow overflow-visible">
        <div className="max-w-[768px] mr-auto ml-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
