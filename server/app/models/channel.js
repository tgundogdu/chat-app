import mongoose from "mongoose";

const { Schema } = mongoose;

const channelSchema = new Schema(
  {
    name: String,
    recipients: [{ type: Schema.Types.ObjectId, ref: "User" }],
    avatar: String,
    description: String,
    isActive: Boolean,
    isGroup: Boolean,
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
