import "dotenv/config";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import unknownRoute from "./middlewares/unknownRoute.js";

const server = express();

const port = process.env.PORT || 8080;
const host = process.env.HOST || "http://localhost:8080";
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

const dbPath = path.join(import.meta.dirname, "database.db");

server.use(logger); // Log requests
server.use(express.json()); // Parse JSON
server.use(cookieParser()); // Parse cookies

server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        imgSrc: ["'none'"],
        fontSrc: ["'none'"],
        styleSrc: ["'none'"],
        scriptSrcAttr: ["'none'"],
        frameAncestors: ["'none'"],
        connectSrc: ["'self'", frontendOrigin],
      },
    },
  })
); // Protect server from common attacks

server.use(
  cors({
    origin: frontendOrigin,
    credentials: true, // Allow credentials like cookies
  })
); // Handle connecting frontend and backend securely
server.use(express.urlencoded({ extended: true })); // Parse URL-encoded

server.get("/connect", (req, res) =>
  res.json({
    success: true,
    data: "HELLO FROM SERVER",
  })
);

server.use("*", unknownRoute);
server.use(errorHandler);

server.listen(port, () => console.log(`Server started running on ${host}`));
