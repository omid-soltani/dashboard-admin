import Joi from "joi";

const productSchema = Joi.object({
  title: Joi.string().min(3).max(50).required().messages({
    "string.empty": "عنوان نباید خالی باشد",
    "any.required": "عنوان الزامی است",
    "string.min": "عنوان باید حداقل 3 کاراکتر باشد",
    "string.max": "عنوان باید حداکثر 50 کاراکتر باشد",
  }),

  shortID: Joi.string().min(3).max(50).required().messages({
    "string.empty": "نام کوتاه نباید خالی باشد",
    "any.required": "نام کوتاه الزامی است",
    "string.min": "نام کوتاه باید حداقل 3 کاراکتر باشد",
    "string.max": "نام کوتاه باید حداکثر 50 کاراکتر باشد",
  }),

  price: Joi.number().required().messages({
    "number.base": "قیمت باید عدد باشد",
    "any.required": "قیمت الزامی است",
  }),
  stock: Joi.number().required().messages({
    "number.base": "قیمت باید عدد باشد",
    "any.required": "قیمت الزامی است",
  }),
  sale: Joi.number().required().messages({
    "number.base": "قیمت باید عدد باشد",
    "any.required": "قیمت الزامی است",
  }),

  category: Joi.string().required().messages({
    "string.empty": "دسته‌بندی نباید خالی باشد",
    "any.required": "دسته‌بندی الزامی است",
  }),
});

export { productSchema };
