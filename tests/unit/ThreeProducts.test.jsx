import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Using global mocks from jest.setup.js

import ThreeProducts from "../../components/products-home/Three-products";

describe("ThreeProducts", () => {
  it("dispatches addProduct when 'Zamów teraz' is clicked", () => {
    const mockDispatch = jest.fn();
    const { useDispatch } = require("react-redux");
    useDispatch.mockReturnValue(mockDispatch);

    const products = [
      {
        id: 1,
        prodTitle: "One",
        price: 1,
        image: "/i1.png",
        imageDescription: "i1",
        description: "d1",
      },
      {
        id: 2,
        prodTitle: "Two",
        price: 2,
        image: "/i2.png",
        imageDescription: "i2",
        description: "d2",
      },
      {
        id: 3,
        prodTitle: "Three",
        price: 3,
        image: "/i3.png",
        imageDescription: "i3",
        description: "d3",
      },
    ];

    render(<ThreeProducts products={products} />);

    const orderLink = screen.getByText(/Zamów teraz/i);
    fireEvent.click(orderLink);

    expect(mockDispatch).toHaveBeenCalled();
    const dispatchedArg = mockDispatch.mock.calls[0][0];
    expect(dispatchedArg).toHaveProperty("type");
    expect(dispatchedArg.payload).toMatchObject({
      prodTitle: products[0].prodTitle,
      price: products[0].price,
    });
  });
});
