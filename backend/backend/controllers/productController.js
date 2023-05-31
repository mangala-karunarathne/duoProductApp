const Product = require("../models/productModel");

const createProduct = async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  const getProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
      if (!product) {
        res.status(404).json(`No Product with id: ${id}`);
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!product) {
        return res.status(404).json(`No Product with id: ${id}`);
      }
      
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      res.status(200).send("Product Deleted");
      if (!product) {
        return res.status(404).json(`No Product with id: ${id}`);
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };


  module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
  };