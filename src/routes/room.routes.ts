import express from "express";
import { createRoom, getRooms } from "../controllers/room.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();
 
router.use(verifyJWT)

router.post("/createRoom",  createRoom);
router.get("/getRooms",  getRooms);

export default router;
