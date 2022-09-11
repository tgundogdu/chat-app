import express from "express";
import auth from "../middlewares/auth.js";
import {
  getChannels,
  updateChannel,
  deleteChannel,
  createChannel,
  getChannelsWithMessages,
  setRecipients,
  deleteAll,
} from "../controllers/channel.js";
import {
  channelValidations,
  handleValidation,
  idValidation,
} from "../middlewares/validate.js";

const router = express.Router();

router.get("/", auth, getChannels);
router.get("/messages", auth, getChannelsWithMessages);

router.patch(
  "/update/:id",
  auth,
  [...idValidation, ...channelValidations],
  handleValidation,
  updateChannel
);

router.patch("/recipients", auth, setRecipients);

router.delete(
  "/delete/:id",
  auth,
  idValidation,
  handleValidation,
  deleteChannel
);

router.post(
  "/create",
  auth,
  channelValidations,
  handleValidation,
  createChannel
);

router.delete("/deleteall", auth, deleteAll);

export default router;
