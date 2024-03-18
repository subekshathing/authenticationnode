import mongoose from "mongoose";
//set schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 65,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: { type: Number, required: true, min: 1 },
});
//create schema/collection/table
const Product = mongoose.model("Product", productSchema);
export default Product;
