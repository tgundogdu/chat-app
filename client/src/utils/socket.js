import { io } from "socket.io-client";

class Socket {
  constructor() {
    this.socket = null;
    console.log("socket class initialized.");
  }

  connect = () => {
    const socket_url = process.env.REACT_APP_API_SOCKET_URL;
    const token = localStorage.getItem("token");
    this.socket = io(socket_url, {
      auth: { token },
    });

    this.socket.on("connect", () => {
      console.log("Connected socket id : " + this.socket.id);
    });
  };

  emit(type, data) {
    this.socket.emit(type, data);
  }
}

export default new Socket();
