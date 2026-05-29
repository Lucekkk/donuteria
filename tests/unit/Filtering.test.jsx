import React from "react";
import { render, screen } from "@testing-library/react";

import ProductsGrid from "../../components/products/Products-grid";
// Using global mocks from jest.setup.js

describe("Filtering (basic)", () => {
  it("renders only filtered products passed as props", () => {
    const prods = [
      { id: 1, prodTitle: "Keep" },
      { id: 2, prodTitle: "Remove" },
    ];

    // simulate a filter that keeps only id 1
    const filtered = prods.filter((p) => p.id === 1);
    render(<ProductsGrid prods={filtered} />);

    expect(screen.getByText("Keep")).toBeInTheDocument();
    expect(screen.queryByText("Remove")).toBeNull();
  });
});
