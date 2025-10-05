import userRoutes from "./user.routes.js";
import messageRoutes from "./message.routes.js"
import roomRoutes from "./room.routes.js"
import { Router } from "express";

const router = Router();
router.use("/user", userRoutes);
router.use("/message",messageRoutes);
router.use("/room",roomRoutes);
export default router;




