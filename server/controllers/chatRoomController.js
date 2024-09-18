const ChatRoom = require("../models/chatRoom");
const Message = require("../models/message");
const { catchAsync } = require("../utils");
const io = require("../socket");
const chatRoom = require("../models/chatRoom");

const addMessage = catchAsync(async (req, res, next) => {
  const { message, roomId } = req.body;
  let room;
  console.log(roomId);
  if (!roomId) {
    room = await ChatRoom.create({});
  } else room = await ChatRoom.findById(roomId);
  // if (!room) room = await ChatRoom.create({});
  let email = req.body.email;
  if (!email) email = undefined;
  const isClient =
    req.headers.origin === "http://localhost:3000" ? true : false;
  const newMessage = await Message.create({
    chatRoom: room._id,
    message,
    isClient,
    email,
  });
  io.getIO().emit("sendMessage", {
    action: "send",
    message: newMessage,
    isClient,
  });
  res.status(201).json({
    status: "success",
    data: { message: newMessage },
  });
});

exports.getMessages = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const messages = await Message.find({ chatRoom: roomId });
  res.status(200).json({ status: "success", data: { messages } });
});

const deleteRoomId = catchAsync(async (req, res, next) => {
  const { roomId, message } = req.body;
  await Message.deleteMany({ chatRoom: roomId });
  await ChatRoom.findByIdAndDelete(roomId);
  io.getIO().emit("sendMessage", { action: "delete", roomId });
  res.status(204).json({ status: "success" });
});

// middleware
exports.typeOfMessage = (req, res, next) => {
  if (req.body.message === "/end") deleteRoomId(req, res, next);
  else addMessage(req, res, next);
};

exports.getRooms = catchAsync(async (req, res, next) => {
  const rooms = await chatRoom.find();
  res.status(200).json({
    status: "success",
    data: { rooms },
  });
});
