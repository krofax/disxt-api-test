import { model, Schema } from "mongoose";

import bcryptService from "../services/bcrypt.service";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 5,
      maxlength: 150,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    lastname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "client",
      enum: ["client", "admin"],
      default: "client",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    this.password = await bcryptService().hashPassword(this);
    next();
  } catch (err) {
    next(err);
  }
});

/*
 * Method
 */
userSchema.methods = {
  toJSON() {
    const { _id, __v, ...rest } = this.toObject();
    return { ...rest, id: _id };
  },
};

export default model("User", userSchema);
