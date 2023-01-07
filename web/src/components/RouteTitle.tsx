import { ReactNode } from "react";

export interface RoutTitleProps {
  children: ReactNode;
}

export function RouteTitle({ children }: RoutTitleProps) {
  return <h1 className="text-4xl break-words my-8 text-center">{children}</h1>;
}
