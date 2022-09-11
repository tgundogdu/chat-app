import http from "http";
import app from "./app.js";

const { PORT } = process.env;
const port = process.env.PORT || PORT;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});