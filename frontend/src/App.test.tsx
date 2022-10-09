import React from "react";
import { render, screen } from "@testing-library/react";
import { RootView } from "./view/Root";

test("renders learn react link", () => {
  render(<RootView />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
