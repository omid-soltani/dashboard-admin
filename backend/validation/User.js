import Joi from "joi";

const userSchema = Joi.object({
  userName: Joi.string().required().messages({
    "string.empty": "User Name is required",
    "any.required": "User Name is required",
  }),
  email: Joi.string()
    .email()
    .required()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .messages({
      "string.pattern.base": "invalid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
      "string.email": "Email is not valid",
    }),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters and contain letters and numbers.",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  role: Joi.string().required().messages({
    "string.empty": "Role is required",
    "any.required": "Role is required",
  }),
});

export { userSchema };
