import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { updateMsgInfo } from "./controllers/message.js";

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
        io.to(receiverSocketId).emit("message_received", messageObj);
      }
    });
  });

  socket.on("acknowledge_send", (acknowledge) => {
    // 1. eğer ack da mesaj varsa
    if (acknowledge.messages.length >= 0) {
      // 2. tüm mesajların 
      updateMsgInfo(acknowledge);
      
      const ackDate = new Date().toISOString();
      // 2. mesajlar lar kadar dön ve her alıcıya gönder
      acknowledge.messages.forEach((msg) => {
        const senderSocketId = global.users[msg.sender];
        if (senderSocketId) {
          acknowledge.date = ackDate;
          io.to(senderSocketId).emit("acknowledge_receive", acknowledge);
        }
      });
    }
  });

  /* socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    console.log("Disconnected socketId: "+socket.id)
  }); */
});
