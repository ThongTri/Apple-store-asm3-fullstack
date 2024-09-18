let io;
const domain = ["http://localhost:3000", "http://localhost:3001"];
module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: domain, // URL client
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    return io;
  },
  getIO: () => io,
};
