import mongoose, { Document, Model } from "mongoose";

export interface IRoom extends Document {
  name: string;
  members: mongoose.Types.ObjectId[]; // users in the room
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new mongoose.Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Room: Model<IRoom> = mongoose.model<IRoom>("Room", roomSchema);
