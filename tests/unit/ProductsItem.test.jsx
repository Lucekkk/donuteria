import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Using global mocks from jest.setup.js

import ProductsItem from "../../components/products/ProductsItem";

describe("ProductsItem", () => {
  it("dispatches addProduct when 'Dodaj do koszyka' is clicked", () => {
    const mockDispatch = jest.fn();
    const { useDispatch } = require("react-redux");
    useDispatch.mockReturnValue(mockDispatch);

    const prod = {
      id: 5,
      prodTitle: "Test Donut",
      price: 3.5,
      description: "Yummy",
      image: "/img.png",
      imageDescription: "img",
      waitingTime: "10 min",
      packaging: "box",
      quantityPerPackage: 1,
      weight: "50g",
      ingredients: "flour",
      allergens: "none",
      additionalInfo: "none",
    };

    render(<ProductsItem {...prod} />);

    const btn = screen.getByText("Dodaj do koszyka");
    fireEvent.click(btn);

    expect(mockDispatch).toHaveBeenCalled();
    const dispatchedArg = mockDispatch.mock.calls[0][0];
    expect(dispatchedArg).toHaveProperty("type");
    expect(dispatchedArg).toHaveProperty("payload");
    expect(dispatchedArg.payload).toMatchObject({
      idProduct: prod.id,
      prodTitle: prod.prodTitle,
      price: prod.price,
    });
  });
});
