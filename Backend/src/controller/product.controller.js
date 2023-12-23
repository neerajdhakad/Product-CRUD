import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/Product.model.js";
import z from "zod";

// Zod schema for product validation
const productSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  price: z.number().min(0),
  category: z.string().min(1).max(255), 
  quantity: z.number().min(0),
});


const createProduct = asyncHandler(async (req, res, next) => {
  const productData = req.body; 
  try {
    const validatedData = productSchema.parse(productData);
    const newProduct = new Product(validatedData);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(new ApiError(400,error.message)); 
  }
});

const getAllProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find();
    res
      .status(201)
      .json(
        new ApiResponse(200, products, "Fetched All Products succesfully!")
      );
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const getProductById = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(`Product not found with ID: ${productId}`, 404);
  }

  res
    .status(201)
    .json(new ApiResponse(200, product, "Product Fetched succesfully!"));
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const updatedData = req.body;

  try {
    const validatedData = productSchema.parse(updatedData);
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      throw new ApiError(404, `Product not found with ID: ${productId}`);
    }

    res
      .status(201)
      .json(
        new ApiResponse(200, updatedProduct, "Updated Product successfully!")
      );
  } catch (error) {
    throw new ApiError(404, error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) {
    throw new ApiError(404, `Product not found with ID: ${productId}`);
  }

  res
    .status(201)
    .json(new ApiResponse(200, deleteProduct, "Deleted Product succesfully!"));
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
