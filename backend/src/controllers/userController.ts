import { Request, Response } from "express";
import User from "../models/userModel";

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.find();
  res.json(users);
};

// Get single user
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
};

// Create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({ success: "User deleted" });
};
