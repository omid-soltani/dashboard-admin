import Joi from "joi";

const commentSchema = Joi.object({
  text: Joi.string().min(6).max(200).required().messages({
    "string.empty": "Comment must not be empty",
    "any.required": "comment required",
    "string.min": "Comment must be at least 6 characters.",
    "string.max": "Comment must be a maximum of 200 characters",
  }),
  userId: Joi.string().required(),
});

export { commentSchema };
