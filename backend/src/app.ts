import express, { json } from 'express';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';
import messageRoutes from './routes/messageRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(json());

app.get('/hello', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Hello, World!',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

export default app;
