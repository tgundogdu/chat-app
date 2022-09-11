import express from "express";
import auth from "../middlewares/auth.js";
import {
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  login,
  register,
  getInfo,
  getUsersWithIds,
  deleteAll
} from "../controllers/user.js";
import {
  loginValidations,
  handleValidation,
  userValidations,
  idValidation,
} from "../middlewares/validate.js";

const router = express.Router();

router.get("/", auth, getAllUsers);
router.post("/list", auth, getUsersWithIds)
router.get("/info", auth, getInfo);
router.get("/:id", auth, idValidation, handleValidation, getUser);
router.patch(
  "/update/:id",
  auth,
  [...idValidation, ...userValidations],
  handleValidation,
  updateUser
);
router.delete("/delete/:id", auth, idValidation, handleValidation, deleteUser);
router.post("/login", loginValidations, handleValidation, login);
router.post("/register", userValidations, handleValidation, register);
router.delete("/deleteall", auth, deleteAll);


export default router;
