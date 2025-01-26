import { Request, Response } from "express";
import User from "../models/userModel";
import { IUser } from "../types/user";

export const mockUsers: IUser[] = [
  {
    user: "Harry Potter",
    interest: ["Magic", "Quidditch"],
    age: 22,
    mobile: "4234243224",
    email: "harry@hogwarts.com",
  },
  {
    user: "Ron Weasley",
    interest: ["Chess", "Sports"],
    age: 22,
    mobile: "4234243225",
    email: "ron@hogwarts.com",
  },
]

// Add default users
export const addDefaultUser = async (req: Request, res: Response): Promise<void> => {
  const users = await User.find();
  if (users?.length === 0) {
    await User.insertMany(mockUsers)
  }
  res.json(users);
};