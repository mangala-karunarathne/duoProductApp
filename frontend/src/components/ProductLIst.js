import { act} from '@testing-library/react';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { default as axios } from "axios";
import { URL } from "./../App";
import loadingImg from "../assets/loader.gif";
import AddProductForm from "./AddProductForm";
import Modal from "react-modal";

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const ProductList = () => {
  const [product, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [productID, setProductID] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productName, category } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/products/get-products`);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await act(async () => {
        await getProducts();
      });
    };

    fetchProducts();
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();
    console.log("xczsfdsd", formData);
    if (formData.productName === "" || formData.category === "") {
      return toast.error("Input field cannot be empty");
    }

    try {
      await axios.post(`${URL}/api/products/post-product`, formData);
      toast.success("Product Added Successfully");
      setFormData({ category: "", productName: "" });
      closeModal();
      getProducts();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getSingleProduct = async (product) => {
    setIsEditing(true);
    setFormData({
      productName: product.productName,
      category: product.category,
    });
    setProductID(product._id);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    if (formData.productName === "" || formData.category === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
      await axios.put(
        `${URL}/api/products/update-product/${productID}`,
        formData
      );

      console.log(productID);
      setFormData({ category: "", productName: "" });
      setIsEditing(false);
      closeModal();
      getProducts();
      toast.success("Product Updated Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${URL}/api/products/delete-product/${id}`);
      toast.success(" Product deleted Succesfully");
      getProducts();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>Product Manager</h2>
      <hr />
      <button className="add-button" onClick={openModal}>
        Add Product
      </button>

      <Modal 
        className="modal --flex-center"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Product Modal"
      >
        <AddProductForm
          createProduct={createProduct}
          handleInputChange={handleInputChange}
          updateProduct={updateProduct}
          getSingleProduct={getSingleProduct}
          isEditing={isEditing}
          formData={formData}
          closeModal={closeModal}
        />
      </Modal>

      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="loading" />
        </div>
      )}
      {!isLoading && product.length === 0 ? (
        <p className="--py">No product added. Please add a Product with Category</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Category</th>
                <th className="last-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => (
                <tr key={product._id} className={"product"}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>{product.category}</td>
                  <td>
                    <div className="product-icons">
                      <FaEdit
                        color="purple"
                        onClick={() => {
                          getSingleProduct(product);
                          openModal();
                        }}
                      />
                      <FaRegTrashAlt
                        color="red"
                        onClick={() => deleteProduct(product._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductList;
