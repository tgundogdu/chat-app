import Message from "../models/message.js";
import Channel from "../models/channel.js";
import { errResponse } from "../helpers/helpers.js";

const getMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await Message.find({ channel: id }).populate("sender");

    res.status(200).json(messages);
  } catch (error) {
    res
      .status(404)
      .json(errResponse(404, error.message, "MSG_00001", req.originalUrl));
  }
};

const createMessage = async (req, res) => {
  const { channel, message, asset = [] } = req.body;
  const { user_id: sender } = req.user;
  try {
    // 1. get channel recipients
    const channelObj = await Channel.findById({ _id: channel }).select({
      recipients: true,
      _id: false,
    });

    // 2. generate message info for each recipient.
    let info = [];
    for (const recipient of channelObj.recipients) {
      info.push({ receiverId: recipient });
    }

    // 3. create message
    const messageObj = await Message.create({
      channel,
      sender,
      message,
      asset,
      isActive: true,
      info: info,
    });

    // 4. return added message
    return res.status(200).json(messageObj);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "MSG_00002", req.originalUrl));
  }
};

const deleteMessage = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const messageObj = await Message.findByIdAndRemove(_id);
    return res.status(200).json(messageObj);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "MSG_00003", req.originalUrl));
  }
};

const updateInfo = async (req, res) => {
  const { msgIds = [], type } = req.body;
  const { user_id } = req.user;

  try {
    for (const id of msgIds) {
      await Message.updateOne(
        {
          _id: id,
          info: { $elemMatch: { receiverId: user_id } },
        },
        { $set: { "info.$.readDate": new Date() } }
      );
    }

    return res.status(200).send(true);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "MSG_00005", req.originalUrl));
  }
};

const updateMessage = async (req, res) => {
  const { channel, message, asset = [], isActive } = req.body;
  const { user_id: sender } = req.user;
  const { id: _id } = req.params;
  try {
    const messageObj = await Message.findByIdAndUpdate(
      _id,
      {
        channel,
        sender,
        message,
        asset,
        isActive,
      },
      { new: true }
    );

    return res.status(200).json(messageObj);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "MSG_00004", req.originalUrl));
  }
};

const deleteAll = async (req, res) => {
  try {
    const deleteted = await Message.deleteMany({});
    return res.status(200).json(deleteted);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "MSG_00006", req.originalUrl));
  }
};

export { getMessages, createMessage, deleteMessage, updateMessage, updateInfo, deleteAll };
