import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: { type: String, select: false },
    avatar: String,
    description: String,
    isActive: Boolean,
    token: String,
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
