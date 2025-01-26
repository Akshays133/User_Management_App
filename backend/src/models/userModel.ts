import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/user";

export interface IUserModel extends IUser, Document { }

const userSchema = new Schema<IUserModel>({
  user: { type: String, required: true },
  interest: { type: [String], required: true },
  age: { type: Number, required: true, min: 1 },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<IUserModel>("User", userSchema);
