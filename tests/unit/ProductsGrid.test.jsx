import React from "react";
import { render, screen } from "@testing-library/react";

import ProductsGrid from "../../components/products/Products-grid";

describe("ProductsGrid", () => {
  it("renders a list of products", () => {
    const prods = [
      { id: 1, prodTitle: "A" },
      { id: 2, prodTitle: "B" },
    ];

    render(<ProductsGrid prods={prods} />);

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
