import { Router } from "express";
import { auth } from "@middlewares";

import * as authHandler from "../handlers/auth.handler";

// Init shared
const router = Router();

// Routes
router.post("/login", authHandler.loginUser);
router.post("/logout", auth, authHandler.logoutUser);

// Export
export default router;
