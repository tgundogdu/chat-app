import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { errResponse } from "../helpers/helpers.js";
import User from "../models/user.js";

// login validations.
const loginValidations = [
  body("email").notEmpty().withMessage("Email cannot be blank.").escape(),
  body("email").isEmail().withMessage("Email have to be valid."),
  body("password").notEmpty().withMessage("Password canot be blank."),
];

// user validations: register and update
const userValidations = [
  body("name").notEmpty().withMessage("Name cannot be blank.").trim().escape(),
  body("email")
    .isEmail()
    .withMessage("Email have to be a valid.")
    .trim()
    .escape()
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      });
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long."),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  body("avatar").optional().trim(),
  body("description").optional().trim().escape(),
  body("isActive")
    .optional()
    .isIn([true, false])
    .withMessage("Active status has to be boolean."),
];

// channel validations: create, update
const channelValidations = [
  body("name").notEmpty().withMessage("Name cannot be blank.").trim().escape(),
  body("avatar").optional().trim(),
  body("description").optional().trim().escape(),
  body("isActive")
    .optional()
    .isIn([true, false])
    .withMessage("Active status has to be boolean."),
  body("isGroup").optional().isIn([true, false]),
  body("recipients").custom((value, { req }) => {
    const { user_id } = req.user;
    if (!Array.isArray(value)) {
      throw new Error("Recipients have to be an aray");
    }
    if (value.length <= 0 || (value.length === 1 && value[0] === user_id)) {
      throw new Error("You didn't add any recipient to channel.");
    }
    return true;
  }),
];

// message validations: create, update
const messageValidations = [
  body("channel").custom((value) => {
    if (!mongoose.isValidObjectId(value)) {
      throw new Error("Channel ID is not valid.");
    }
    //TODO: Is channel ID valid on database.
    return true;
  }),
  body("message").notEmpty().withMessage("Message cannot be blank."),
  body("asset")
    .optional()
    .isArray({ max: 4 })
    .withMessage("Asset have to be array. And max 4 assets."),
  body("isActive")
    .optional()
    .isIn([true, false])
    .withMessage("Active status has to be boolean."),
];

// id param validation
const idValidation = [
  param("id").custom((value) => {
    if (!mongoose.isValidObjectId(value)) {
      throw new Error("ID is not valid.");
    }
    return true;
  }),
];

// handle given validations
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(
        errResponse(
          422,
          "Validation Error!.",
          "VE33333",
          req.originalUrl,
          errors.array()
        )
      );
  }

  next();
};

export {
  loginValidations,
  userValidations,
  idValidation,
  channelValidations,
  messageValidations,
  handleValidation,
};
