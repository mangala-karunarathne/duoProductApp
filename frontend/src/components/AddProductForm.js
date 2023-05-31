import React from "react";

const ProductForm = ({
  createProduct,
  productName,
  category,
  handleInputChange,
  isEditing,
  updateProduct,
  formData,
  closeModal,
}) => {
  return (
    <form
      className="product-form"
      onSubmit={isEditing ? updateProduct : createProduct}
    >
      <div>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          placeholder="Add a Product"
          name="productName"
          value={isEditing ? formData.productName : productName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category Name:</label>
        <input
          type="text"
          id="category"
          placeholder="Add a Category"
          name="category"
          value={isEditing ? formData.category : category}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="add-product-button">
        {isEditing ? "Edit" : "Add"}
      </button>
      <button onClick={closeModal} className="close-product-button">
        Close
      </button>
    </form>
  );
};

export default ProductForm;
