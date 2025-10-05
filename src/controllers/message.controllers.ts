import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";


export const saveMessage = async (roomId: string, sender: string, message: string) => {
  const newMessage = (await Message.create({ roomId, sender, message })).populate("sender");
  return newMessage;
};
export const getMessagesByRoom = asyncHandler(async (req: Request, res: Response) => {
  const { roomId } = req.params as { roomId: string };


  if (!roomId) {

    throw new ApiError(400, "Room ID is required");
  }

  const messages = await Message.find({ roomId }).populate("sender").sort({ createdAt: -1 });

  return res
    .status(201)
    .json(
      new ApiResponse(200, messages, "Messages fetched successfully")
    );
});




