import Channel from "../models/channel.js";
import { errResponse } from "../helpers/helpers.js";
import mongoose from "mongoose";

const getChannelsWithMessages = async (req, res) => {
  const userId = [mongoose.Types.ObjectId(req.user.user_id)];
  try {
    const match = {
      $match: {
        recipients: {
          $in: userId,
        },
      },
    };
    const sort = { $sort: { createdAt: -1 } };
    const lookup = {
      $lookup: {
        from: "messages",
        localField: "_id",
        foreignField: "channel",
        as: "messages",
        pipeline: [sort, { $limit: 1 }],
      },
    };
    const pipeline = [sort, match, lookup];

    const channels = await Channel.aggregate(pipeline);

    res.status(200).json(channels);
  } catch (error) {
    res
      .status(404)
      .json(errResponse(404, error.message, "CH_00001", req.originalUrl));
  }
};

const getChannels = async (req, res) => {
  const { user_id } = req.user;
  try {
    const channels = await Channel.find({ recipients: { $in: user_id } })
      .populate("recipients")
      .populate("createdBy");
    res.status(200).json(channels);
  } catch (error) {
    res
      .status(404)
      .json(errResponse(404, error.message, "CH_00001", req.originalUrl));
  }
};

const createChannel = async (req, res) => {
  const {
    name,
    recipients,
    avatar = "",
    description = "...",
    isGroup,
  } = req.body;
  const { user_id } = req.user;
  try {
    if (recipients.indexOf(user_id) < 0) {
      recipients.unshift(user_id);
    }

    const channel = await Channel.create({
      name,
      recipients,
      avatar,
      description,
      isGroup,
      isActive: true,
      createdBy: user_id,
    });
    return res.status(200).json(channel);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "CH_00002", req.originalUrl));
  }
};

const deleteChannel = async (req, res) => {
  const { id: _id } = req.params;
  const { user_id } = req.user;
  try {
    const channel = await Channel.findById(_id);
    if (channel && channel.createdBy === user_id) {
      //TODO: before the delete we have to delete this channel messages.
      const deletedChannel = await Channel.findByIdAndRemove(_id);
      return res.status(200).json(deletedChannel);
    }
    return res
      .status(401)
      .json(
        errResponse(
          401,
          "You are not authorized to delete this chat",
          "CH_00003",
          req.originalUrl
        )
      );
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "CH_00003", req.originalUrl));
  }
};

const updateChannel = async (req, res) => {
  const { user_id } = req.user;
  const {
    name,
    recipients,
    avatar = "",
    description = "...",
    isActive,
    createdBy = user_id,
  } = req.body;
  const { id: _id } = req.params;
  try {
    if (recipients.indexOf(user_id) < 0) {
      recipients.unshift(user_id);
    }

    const channel = await Channel.findByIdAndUpdate(
      _id,
      {
        name,
        recipients,
        avatar,
        description,
        isActive,
        createdBy,
      },
      { new: true }
    );

    return res.status(200).json(channel);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "CH_00004", req.originalUrl));
  }
};

const setRecipients = async (req, res) => {
  const { user_id } = req.user;
  const { channelId, recipients } = req.body;

  try {
    // TODO: cannot update if the createdBy this user exept
    const channel = await Channel.findByIdAndUpdate(
      { _id: channelId },
      {
        recipients,
      },
      { new: true }
    );

    return res.status(200).send(true);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "CH_00004", req.originalUrl));
  }
};

const deleteAll = async (req, res) => {
  try {
    const deleteted = await Channel.deleteMany({});
    return res.status(200).json(deleteted);
  } catch (error) {
    res
      .status(409)
      .json(errResponse(409, error.message, "CH_00005", req.originalUrl));
  }
};

export {
  getChannels,
  getChannelsWithMessages,
  createChannel,
  deleteChannel,
  updateChannel,
  setRecipients,
  deleteAll,
};
