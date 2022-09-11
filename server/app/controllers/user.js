import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errResponse } from "../helpers/helpers.js";

const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate if user exist in our database
    const user = await User.findOne({ email }).select("+password");
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      user.token = token;
      user.password = undefined;
      return res.status(200).json(user);
    }
    return res
      .status(400)
      .json(errResponse(400, "Invalid Credentials", "L002", req.originalUrl));
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "L002", req.originalUrl));
  }
};

const getInfo = async (req, res) => {
  const { user_id: _id } = req.user;
  try {
    const user = await User.findById(_id);
    if (user) {
      return res.status(200).json(user);
    }
    return res
      .status(404)
      .json(errResponse(400, "Error!", "L020", req.originalUrl));
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "L002", req.originalUrl));
  }
};

const register = async (req, res) => {
  const { name, email, password, avatar = "", description = "" } = req.body;
  try {
    let encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      avatar,
      description,
      isActive: true,
    });

    user.password = undefined;
    return res.status(200).json(user);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "L0022", req.originalUrl));
  }
};

const getAllUsers = async (req, res) => {
  const { user_id } = req.user;
  try {
    const users = await User.find({ isActive: true, _id: { $ne: user_id } });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(404)
      .json(errResponse(404, error.message, "US20001", req.originalUrl));
  }
};

const getUsersWithIds = async (req, res) => {
  const ids = req.body;
  try {
    const users = await User.find({ _id: { $in: ids } });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(404)
      .json(errResponse(404, error.message, "US2000122", req.originalUrl));
  }
};

const getUser = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const user = await User.findById(_id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const deleteUser = await User.findByIdAndRemove(_id);
    return res.status(200).json(deleteUser);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "UD20001", req.originalUrl));
  }
};

const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(409)
      .json(errResponse(409, error.message, "UU20001", req.originalUrl));
  }
};

const deleteAll = async (req, res) => {
  try {
    const deleteted = await User.deleteMany({});
    return res.status(200).json(deleteted);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "USR_00005", req.originalUrl));
  }
};

export {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  login,
  register,
  getInfo,
  getUsersWithIds,
  deleteAll,
};
