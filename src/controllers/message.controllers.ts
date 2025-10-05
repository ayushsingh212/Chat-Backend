import { Message } from "../models/message.model.js";








export const saveMessage = async (roomId: string, sender: string, message: string) => {
  const newMessage = await Message.create({ roomId, sender, message });
  return newMessage;
};

export const getMessagesByRoom = async (roomId: string) => {
  return await Message.find({ roomId }).sort({ createdAt: 1 });

};




