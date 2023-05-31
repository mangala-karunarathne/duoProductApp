const request = require('supertest');
const app = require('../app');
const Product = require('../models/productModel');

describe('Product Controller', () => {
  beforeEach(async () => {

    await Product.deleteMany();
  });

  describe('POST /api/products', () => {
    test('should create a new product', async () => {
      const productData = { productName: 'Test Product', category: 'Test Category' };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(200);

      expect(response.body.productName).toBe('Test Product');
      expect(response.body.category).toBe('Test Category');
    });
  });

  describe('GET /api/products', () => {
    test('should get all products', async () => {
      await Product.create({ productName: 'Product 1', category: 'Category 1' });
      await Product.create({ productName: 'Product 2', category: 'Category 2' });

      const response = await request(app).get('/api/products').expect(200);

      expect(response.body.length).toBe(2);
      expect(response.body[0].productName).toBe('Product 1');
      expect(response.body[0].category).toBe('Category 1');
      expect(response.body[1].productName).toBe('Product 2');
      expect(response.body[1].category).toBe('Category 2');
    });
  });

  describe('GET /products/:id', () => {
    it('should return a single product if it exists', async () => {
      const response = await request(app).get('/products/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('productName');
      expect(response.body).toHaveProperty('category');
    });

    it('should return 404 if product does not exist', async () => {
      const response = await request(app).get('/products/100');
      expect(response.status).toBe(404);
      expect(response.body).toEqual('No Product with id: 100');
    });
  });

  describe('PUT /products/:id', () => {
    it('should update a product if it exists', async () => {
      const updatedProductData = {
        productName: 'Updated Product',
        category: 'Updated Category',
      };

      const response = await request(app)
        .put('/products/1')
        .send(updatedProductData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('productName', updatedProductData.productName);
      expect(response.body).toHaveProperty('category', updatedProductData.category);
    });

    it('should return 404 if product does not exist', async () => {
      const updatedProductData = {
        productName: 'Updated Product',
        category: 'Updated Category',
      };

      const response = await request(app)
        .put('/products/100')
        .send(updatedProductData);

      expect(response.status).toBe(404);
      expect(response.body).toEqual('No Product with id: 100');
    });
  });

  describe('DELETE /products/:id', () => {
    it('should delete a product if it exists', async () => {
      const response = await request(app).delete('/products/1');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Product Deleted');
    });

    it('should return 404 if product does not exist', async () => {
      const response = await request(app).delete('/products/100');
      expect(response.status).toBe(404);
      expect(response.body).toEqual('No Product with id: 100');
    });
  }); 
  
  // Add more test cases for other controller functions (e.g., getProduct, updateProduct, deleteProduct)
});
