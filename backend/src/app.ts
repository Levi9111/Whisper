import path from 'path';
import express, { json } from 'express';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';
import messageRoutes from './routes/messageRoutes';
import userRoutes from './routes/userRoutes';
import { clerkMiddleware } from '@clerk/express';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(json());
app.use(clerkMiddleware());
app.get('/hello', (_req, res) => {
  return res.json({
    status: 'OK',
    message: 'Hello World!',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// error handlers must be last middleware
app.use(errorHandler);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../web/dist')));

  app.get('/{*any}', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../web/dist/index.html'));
  });
}

export default app;
