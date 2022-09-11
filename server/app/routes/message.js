import express from "express";
import auth from "../middlewares/auth.js";
import {
  getMessages,
  deleteMessage,
  createMessage,
  updateInfo,
  deleteAll,
} from "../controllers/message.js";
import {
  messageValidations,
  handleValidation,
  idValidation,
} from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/create",
  auth,
  messageValidations,
  handleValidation,
  createMessage
);

router.get("/:id", auth, idValidation, handleValidation, getMessages);

router.delete(
  "/delete/:id",
  auth,
  idValidation,
  handleValidation,
  deleteMessage
);

router.patch("/updateinfo", auth, updateInfo);
router.delete("/deleteall", auth, deleteAll);

// router.patch(
//   "/update/:id",
//   auth,
//   [...idValidation, ...messageValidations],
//   handleValidation,
//   updateMessage
// );

export default router;
