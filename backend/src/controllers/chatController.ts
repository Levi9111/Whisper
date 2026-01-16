import type { NextFunction, Response } from 'express';
import type { AuthRequest } from '../middleware/auth';
import { Chat } from '../models/Chat';
import { Types } from 'mongoose';

const getChats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req;

    const chats = await Chat.find({
      participants: userId,
    })
      .populate('participants', 'name email avatar')
      .populate('lastMessage')
      .sort({
        lastMessageAt: -1,
      });

    const formattedChats = chats.map((chat) => {
      const otherParticipants = chat.participants.find(
        (p) => p._id.toString() !== userId,
      );

      return {
        _id: chat._id,
        participants: otherParticipants,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
      };
    });

    return res.status(200).json(formattedChats);
  } catch (error) {
    return next(error);
  }
};

const getOrCreateChat = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req;
    const { participantId } = req.params;

    if (!Types.ObjectId.isValid(participantId as string)) {
      return res.status(400).json({ message: 'Invalid participant ID' });
    }

    if (participantId === userId) {
      return res
        .status(400)
        .json({ message: 'Cannot create chat with yourself' });
    }

    let chat = await Chat.findOne({
      participants: {
        $all: [userId, participantId],
      },
    }).populate('participants', 'name email avatar');

    if (!chat) {
      const newChat = new Chat({
        participants: [userId, participantId],
      });
      await newChat.save();
      chat = await newChat.populate('participants', 'name email avatar');
    }

    const otherParticipant = chat.participants.find(
      (p) => p._id.toString() !== userId,
    );

    return res.status(200).json({
      _id: chat._id,
      participants: otherParticipant ?? null,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt,
    });
  } catch (error) {
    return next(error);
  }
};

export const ChatControllers = {
  getChats,
  getOrCreateChat,
};
