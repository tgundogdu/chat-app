import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const { PORT } = process.env;
const port = process.env.PORT || PORT;

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// ------- socket.io ----------------

const io = new Server(httpServer, {
  pingTimeout: 30000, // default 20000
  pingInterval: 30000, // default 25000
  maxHttpBufferSize: 1e6, // 1 MB
  cors: {
    origin: "http://localhost:3000",
  },
});

io.use((socket, next) => {
  const { token } = socket.handshake.auth;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    socket.userId = decoded.user_id;
    next();
  } catch (err) {
    console.log("INVALID_TOKEN");
    //leave connection.
  }
});

global.users = {};

io.on("connection", (socket) => {
  global.users[socket.userId] = socket.id;

  socket.on("new_message", (messageObj) => {
    const senderId = messageObj.sender;
    const receivers = messageObj.info;

    if (receivers.length <= 0) {
      return console.log("There are no receivers.");
    }

    receivers.forEach((receiver) => {
      const receiverSocketId = global.users[receiver.receiverId];
      if (receiverSocketId && senderId !== receiver.receiverId) {
        //user online and not the sender. send message this user.
        io.to(receiverSocketId).emit("message_received", messageObj);
      }
    });
  });

  socket.on("acknowledge_receive", (ackObj) => {
    const senderSocketId = global.users[ackObj.senderId];
    if (senderSocketId){
      if (ackObj.ack === "delivered"){
        ackObj.deliveredDate = new Date();
      }
      else if (ackObj.ack === "readed"){
        ackObj.readDate = new Date();
      }
      io.to(senderSocketId).emit("acknowledge_send", ackObj);
    }
  })

  /* socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    console.log("Disconnected socketId: "+socket.id)
  }); */
});
