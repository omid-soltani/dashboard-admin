import mongoose from "mongoose";

const model = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Approved", "Pending", "Banned"],
      required: true,
      default: "Pending",
    },
    replied: {
      type: Number,
      enum: [0, 1],
      required: true,
      default: 0,
    },
    text: {
      type: String,
      required: true,
    },
    replyText: {
      type: String,
      default: "",
    },
    ban: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    replyComment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const commentModel = mongoose.model("Comment", model);
export { commentModel };
