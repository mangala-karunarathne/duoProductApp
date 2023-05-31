import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../components/AddProductForm';

test('renders product form with correct inputs and submit button', () => {
  // Define mock props
  const createProduct = jest.fn();
  const updateProduct = jest.fn();
  const productName = 'Test Product';
  const category = 'Test Category';
  const handleInputChange = jest.fn();
  const isEditing = false;
  const formData = { productName: '', category: '' };

  // Render the component
  render(
    <ProductForm
      createProduct={createProduct}
      productName={productName}
      category={category}
      handleInputChange={handleInputChange}
      isEditing={isEditing}
      updateProduct={updateProduct}
      formData={formData}
    />
  );

  // Assert that the inputs and submit button are rendered correctly
  const productNameInput = screen.getByPlaceholderText('Add a Product');
  const categoryInput = screen.getByPlaceholderText('Add a Category');
  const submitButton = screen.getByRole('button', { name: 'Add' });

  expect(productNameInput).toBeInTheDocument();
  expect(categoryInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(productNameInput).toHaveValue(productName);
  expect(categoryInput).toHaveValue(category);
});

test('calls createProduct function on form submission when not in editing mode', () => {
  // Define mock props
  const createProduct = jest.fn();
  const updateProduct = jest.fn();
  const productName = 'Test Product';
  const category = 'Test Category';
  const handleInputChange = jest.fn();
  const isEditing = false;
  const formData = { productName: '', category: '' };

  // Render the component
  render(
    <ProductForm
      createProduct={createProduct}
      productName={productName}
      category={category}
      handleInputChange={handleInputChange}
      isEditing={isEditing}
      updateProduct={updateProduct}
      formData={formData}
    />
  );

  // Simulate form submission
  fireEvent.submit(screen.getByRole('button', { name: 'Add' }));

  // Assert that the createProduct function is called
  expect(createProduct).toHaveBeenCalled();
});

test('calls updateProduct function on form submission when in editing mode', () => {
  // Define mock props
  const createProduct = jest.fn();
  const updateProduct = jest.fn();
  const productName = 'Test Product';
  const category = 'Test Category';
  const handleInputChange = jest.fn();
  const isEditing = true;
  const formData = { productName: '', category: '' };

  // Render the component
  render(
    <ProductForm
      createProduct={createProduct}
      productName={productName}
      category={category}
      handleInputChange={handleInputChange}
      isEditing={isEditing}
      updateProduct={updateProduct}
      formData={formData}
    />
  );

  // Simulate form submission
  fireEvent.submit(screen.getByRole('button', { name: 'Edit' }));

  // Assert that the updateProduct function is called
  expect(updateProduct).toHaveBeenCalled();
});