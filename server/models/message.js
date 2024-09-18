const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    message: String,
    chatRoom: { type: Schema.Types.ObjectId, ref: "ChatRoom" },
    isClient: { type: Boolean },
    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
