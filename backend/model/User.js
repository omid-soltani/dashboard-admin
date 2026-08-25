import mongoose from "mongoose";

const model = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isBan: {
      type: Number,
      required: true,
      default: 0,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("User", model);

export { userModel };
