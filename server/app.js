//handle uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.log(err.name, err.message);
//   console.log("uncaught exception! Shutdown server now!");
//   process.exit(1);
// });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const chatRoomRoute = require("./routes/chatRoomRoute");
const orderRoute = require("./routes/orderRoute");
const AppError = require("./appError");
const errorController = require("./controllers/errorController");

dotenv.config({ path: "./config.env" });
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/chat", chatRoomRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});
app.use(errorController.globalError);

const uri = process.env.DATABASE;
const port = process.env.PORT || 5000;
async function connectDb() {
  await mongoose.connect(uri);
  console.log("database connected");
  const server = app.listen(port);

  const io = require("./socket").init(server);
  io.on("connection", (socket) => {
    console.log("Client connected");
  });
  //unhandle promises
  // process.on("unhandledRejection", (err) => {
  //   console.log(err.name, err.message);
  //   console.log("unhandled Rejection! Shutdown server now!");
  //   server.close(() => {
  //     process.exit(1);
  //   });
  // });
}

connectDb();
