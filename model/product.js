import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 1500,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

/*
 * Methods
 */
productSchema.methods = {
  toJSON() {
    const { _id, __v, ...rest } = this.toObject();
    return { ...rest, id: _id };
  },
};

export default model("Product", productSchema);
