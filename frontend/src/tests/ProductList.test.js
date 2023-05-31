import React from "react";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import ProductList from "../components/ProductLIst";
const axios = require("axios");
jest.mock("axios");

describe("ProductList", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
  });

  test("renders the component", () => {
    render(<ProductList />);

    expect(screen.getByText("Product Manager")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Product" })
    ).toBeInTheDocument();
  });

  // test('fetches and renders products', async () => {
  //   const products = [
  //     { _id: '1', productName: 'Product 1', category: 'Category 1' },
  //     { _id: '2', productName: 'Product 2', category: 'Category 2' },
  //   ];
  //   axios.get.mockResolvedValue({ data: products });

  //   render(<ProductList />);

  //   // Wait for the products to be fetched and rendered
  //   await screen.findAllByRole('row');

  //   // Verify that the products are rendered correctly
  //   expect(screen.getByText('Product 1')).toBeInTheDocument();
  //   expect(screen.getByText('Category 1')).toBeInTheDocument();
  //   expect(screen.getByText('Product 2')).toBeInTheDocument();
  //   expect(screen.getByText('Category 2')).toBeInTheDocument();
  // });

  test("fetches and renders products", async () => {
    const products = [
      { _id: "1", productName: "Product 1", category: "Category 1" },
      { _id: "2", productName: "Product 2", category: "Category 2" },
    ];
    axios.get.mockResolvedValue({ data: products });

    await act(async () => {
      render(<ProductList />);
      await screen.findAllByRole("row");
    });

    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Category 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Category 2/i)).toBeInTheDocument();
  });

  test('opens and closes the modal when clicking "Add Product" button', () => {
    render(<ProductList />);

    // Verify that the modal is initially closed
    expect(
      screen.queryByLabelText("Add Product Modal")
    ).not.toBeInTheDocument();

    // Click the "Add Product" button
    fireEvent.click(screen.getByRole("button", { name: "Add Product" }));

    // Verify that the modal is now open
    expect(screen.getByLabelText("Add Product Modal")).toBeInTheDocument();

    // Click the "Close Modal" button
    fireEvent.click(screen.getByRole("button", { name: "Close Modal" }));

    // Verify that the modal is closed again
    expect(
      screen.queryByLabelText("Add Product Modal")
    ).not.toBeInTheDocument();
  });

  // Add more tests for other functionality in the component
});
