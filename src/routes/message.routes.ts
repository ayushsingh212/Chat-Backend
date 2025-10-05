import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getMessagesByRoom } from "../controllers/message.controllers.js";

const router =  Router();




router.use(verifyJWT);

router.get("/messages/:roomId",getMessagesByRoom);

export default router;