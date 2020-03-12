import * as http from "http";
import express from "express";
import BaseRouter from "./routes";
import helmet from "helmet";
import cors from "cors";

import { ServerTypes } from "@ts";

declare global {
  namespace Express {
    interface Request {
      fileValidationError: any;
      user: ServerTypes.Token;
    }
  }
}

// Init express
const app = express();
// Wrap express with http (for socket.io)
const server = http.createServer(app);

/**
 * Add middleware/settings/routes to express.
 */
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", BaseRouter);

/**
 * Export socket-wrapped-express instance
 */
export default server;
