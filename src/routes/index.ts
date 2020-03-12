import { Router } from "express";
import AuthRouter from "./auth.route";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/auth", AuthRouter);

// Generic entry point
router.use("/", (req, res) =>
  res.json({ message: "I am on the line.", data: req.body })
);

// Export the base-router
export default router;
