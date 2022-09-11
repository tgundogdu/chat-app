import jwt from "jsonwebtoken";
import { errResponse } from "../helpers/helpers.js";

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json(errResponse(403, "A token is required for authentication", "L001", req.originalUrl));
  }

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res
      .status(401)
      .json(errResponse(401, "Invalid token", "L002", req.originalUrl));
  }
  return next();
};

export default verifyToken;
