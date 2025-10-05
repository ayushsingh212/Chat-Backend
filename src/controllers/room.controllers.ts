import { Request, Response } from "express";
import { Room, IRoom } from "../models/room.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new room
const createRoom = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body as { name: string };

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Room name is required");
  }

  // Check if room already exists
  const existingRoom = await Room.findOne({ name });
  if (existingRoom) {
    throw new ApiError(409, "Room already exists");
  }

  const room = await Room.create({ name, members: [] });

  return res
    .status(201)
    .json(new ApiResponse(201, room, "Room created successfully"));
});

// Get all rooms
const getRooms = asyncHandler(async (_req: Request, res: Response) => {
   console.log("Rooms route has been hitted")
  const rooms = await Room.find().populate("members", "-password ");
  return res
    .status(200)
    .json(new ApiResponse(200, rooms, "Rooms fetched successfully"));
});

export { createRoom, getRooms };
