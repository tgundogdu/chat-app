import mongoose from "mongoose";

const { Schema } = mongoose;

const assetSchema = new Schema({
  name: String,
  ext: String,
  path: String,
  base64Data: String,
});

const messageInfoSchema = new Schema(
  {
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sentDate: { type: Date, default: new Date() },
    deliveredDate: { type: Date, default: null },
    readDate: { type: Date, default: null },
  },
  { _id: false }
);

const messageSchema = new Schema(
  {
    channel: { type: Schema.Types.ObjectId, ref: "Channel", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: String,
    asset: [assetSchema],
    isActive: Boolean,
    info: [messageInfoSchema],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
