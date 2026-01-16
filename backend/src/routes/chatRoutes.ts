import { Router } from 'express';
import { ChatControllers } from '../controllers/chatController';
import { protectedRoute } from '../middleware/auth';

const router = Router();

router.use(protectedRoute);

router.get('/', ChatControllers.getChats);

router.post('/with/:participantId', ChatControllers.getOrCreateChat);

const chatRoutes = router;

export default chatRoutes;
