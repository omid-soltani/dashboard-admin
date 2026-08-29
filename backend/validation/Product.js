import Joi from "joi";

const productSchema = Joi.object({
  title: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title must be at most 50 characters long",
  }),

  shortID: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Short name cannot be empty",
    "any.required": "Short name is required",
    "string.min": "Short name must be at least 3 characters long",
    "string.max": "Short name must be at most 50 characters long",
  }),

  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
  }),

  stock: Joi.number().required().messages({
    "number.base": "Stock must be a number",
    "any.required": "Stock is required",
  }),

  sale: Joi.number().messages({
    "number.base": "Sale must be a number",
    "any.required": "Sale is required",
  }),

  category: Joi.string().required().messages({
    "string.empty": "Category cannot be empty",
    "any.required": "Category is required",
  }),
});

export { productSchema };
