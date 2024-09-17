import { ReactNode } from "react";

export interface RoutTitleProps {
  children: ReactNode;
}

export function RouteTitle({ children }: RoutTitleProps) {
  return <h1 className="my-8 break-words text-center text-4xl">{children}</h1>;
}
