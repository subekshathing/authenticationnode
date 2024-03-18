import Yup from "yup";

export const addProductValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .trim()
    .max(65, "Name must be at max 65 character"),
  price: Yup.number()
    .required("price is required")
    .min(0, "price cant be negative number"),
  quantity: Yup.number()
    .required("quantity is required")
    .min(1, "Quantity must be at least 1"),
});
