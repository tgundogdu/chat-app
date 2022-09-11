import dotenv from "dotenv";
import database from "./config/database.js";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.js";
import channelRoutes from "./routes/channel.js";
import messageRoutes from "./routes/message.js";
import { errResponse } from "./helpers/helpers.js";

// sending env params to app.
dotenv.config();

// connecting to database
database.connect();

// create an express app
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/user", userRoutes);
app.use("/channel", channelRoutes);
app.use("/message", messageRoutes);

app.use("*", (req, res) => {
  res
    .status(403)
    .json(errResponse(404, "Bad request", "NF_00001", req.originalUrl));
});

export default app;
