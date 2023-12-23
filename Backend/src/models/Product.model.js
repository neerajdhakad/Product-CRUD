import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    description: {
      type: String,
      required: true, 
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
