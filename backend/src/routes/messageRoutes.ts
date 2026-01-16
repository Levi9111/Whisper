import { Router } from 'express';
import { protectedRoute } from '../middleware/auth';
import { messageController } from '../controllers/messageController';

const router = Router();

router.get('/chat/:chatId', protectedRoute, messageController.getMessages);

const messageRoutes = router;

export default messageRoutes;
