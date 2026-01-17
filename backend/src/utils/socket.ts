import { Socket, Server as SockerServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { verifyToken } from '@clerk/express';
import { User } from '../models/User';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';

// store online users in memory: userId -> socketId
export const onlineUsers = new Map<string, string>();

export const initializeSocket = (httpServer: HttpServer) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:8081',
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[];

  const io = new SockerServer(httpServer, {
    cors: { origin: allowedOrigins },
  });

  //   verify socket connection if user is authenticated we will store userId in socket object

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));

    try {
      const session = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
      });

      const clerkId = session.sub;

      const user = await User.findOne({ clerkId });

      if (!user) return next(new Error('User not found'));

      socket.data.userId = user._id.toString();

      next();
    } catch (error: any) {
      next(error);
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.data.userId;

    // send list of current online users to the newly connected client
    socket.emit('online-users', { userId: Array.from(onlineUsers.keys()) });

    //store the users in the online users map
    onlineUsers.set(userId, socket.id);

    // notify others that a new user is online
    socket.broadcast.emit('user-online', { userId });

    socket.join(`user:${userId}`);

    socket.on('join-chat', (chatId: string) => {
      socket.join(`chat:${chatId}`);
    });

    socket.on('leave-chat', (chatId: string) => {
      socket.leave(`chat:${chatId}`);
    });

    // handle sending messages
    socket.on(
      'send-message',
      async (data: { chatId: string; text: string }) => {
        try {
          const { chatId, text } = data;
          const chat = await Chat.findOne({
            _id: chatId,
            participants: userId,
          });

          if (!chat) {
            socket.emit('socket-error', { message: 'Chat not found!' });
            return;
          }

          const message = await Message.create({
            chat: chatId,
            sender: userId,
            text,
          });

          chat.lastMessage = message._id;
          chat.lastMessageAt = new Date();

          await chat.save();

          await message.populate('sender', 'name email avatar');

          // emit the message to all participants in the chat
          io.to(`chat:${chatId}`).emit('new-message', message);

          // emit the message to each participant's personal room
          for (const participantsId of chat.participants) {
            io.to(`user:${participantsId}`).emit('new-message', message);
          }
        } catch (error) {
          socket.emit('socket-error', { message: 'Failed to send message.' });
        }
      },
    );

    // TODO:
    socket.on('typing', async (data) => {});

    socket.on('disconnect', () => {
      onlineUsers.delete(userId);

      // notify others that a user went offline
      socket.broadcast.emit('user-offline', { userId });
    });
  });

  return io;
};
