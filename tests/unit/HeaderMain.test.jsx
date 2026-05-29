import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("react-redux", () => ({ useSelector: jest.fn(() => []) }));
jest.mock("@/lib/useAuth", () => ({
  useAuth: () => ({ isAuthenticated: false, user: null }),
}));
jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

import HeaderMain from "../../components/header/Header-main";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
});

describe("HeaderMain", () => {
  it("renders heading and main nav link", () => {
    render(<HeaderMain />);
    expect(screen.getByText("Słodki donut")).toBeInTheDocument();
    expect(screen.getByText("Strona główna")).toBeInTheDocument();
  });
});
