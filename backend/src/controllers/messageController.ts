import type { NextFunction, Response } from 'express';
import type { AuthRequest } from '../middleware/auth';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';

const getMessages = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { chatId } = req.params;
    const { userId } = req;

    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId,
    });

    if (!chat) {
      res.status(404).json({ message: 'Chat not found or access denied' });
      return;
    }

    const messages = await Message.find({
      chat: chatId,
    })
      .populate('sender', 'name email avatar')
      .sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
};

export const messageController = {
  getMessages,
};
