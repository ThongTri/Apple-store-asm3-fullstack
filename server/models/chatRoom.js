const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
  client: { type: String, required: false },
});

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
