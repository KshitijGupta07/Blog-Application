import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    
    // keep selectable so credentials login can read it when requested
    passwordHash: { type: String, select: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
