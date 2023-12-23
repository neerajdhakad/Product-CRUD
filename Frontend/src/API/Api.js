import axios from 'axios';
import { toast } from 'react-toastify';

// const API_URL = 'http://localhost:8000/api/v1/products';
const API_URL = 'https://mern-product-crud-backend.onrender.com/api/v1/products';

const postFormData = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}`, formData);
    toast.success('Product Added!');
    return response.data;
  } catch (error) {
    toast.error('Error Adding Product!');
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    toast.error('Error Fetching Product Data!');
    throw error;
  }
};

const updateProduct = async (productId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, updatedData);
    toast.success('Product Updated!');
    return response.data;
  } catch (error) {
    toast.error('Error Updating Product!');
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`);
    toast.success("Product deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error('Error Deleting Product!');
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    toast.error('Error Fetching Products!');
    throw error;
  }
};

export {
  postFormData,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
