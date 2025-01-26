import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController";
import { validateUser } from "../middlewares/validateRequest";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validateUser, createUser);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;
