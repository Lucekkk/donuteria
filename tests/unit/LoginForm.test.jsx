import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("next/link", () => ({
  __esModule: true,
  default: (props) => <a {...props} />,
}));
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

// Keep actual React but override useActionState used in the page
jest.mock("react", () => {
  const ActualReact = jest.requireActual("react");
  return { ...ActualReact, useActionState: jest.fn() };
});

// Prevent loading server-side/network helpers when importing the page
jest.mock("@/lib/actions", () => ({ loginUser: jest.fn() }));

import Logowanie from "../../app/logowanie/page";

describe("Logowanie page", () => {
  it("renders heading and shows error messages from state.message", () => {
    const { useActionState } = require("react");
    useActionState.mockReturnValue([
      { message: "Uzupełnij dane", values: {} },
      () => {},
      false,
    ]);

    render(<Logowanie />);

    expect(screen.getByText("Logowanie")).toBeInTheDocument();
    expect(screen.getByText("Uzupełnij dane")).toBeInTheDocument();
  });
});
