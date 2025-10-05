import mongoose from "mongoose";
import { IUser } from "./user.model.js";
import { IRoom } from "./room.model.js";

export interface IMessage extends Document{
  sender:IUser["_id"],
  message:string,
  roomId:IRoom["_id"],
  createdAt:Date,
  updatedAt:Date

}

const messageSchema = new mongoose.Schema<IMessage>({
  
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  message:{
    type:String,
    required:true
  },
  roomId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Room",
    required:true
  }
},{
  timestamps:true
});

export const Message = mongoose.model("Message",messageSchema);