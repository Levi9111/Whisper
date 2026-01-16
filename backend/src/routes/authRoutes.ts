import { Router } from 'express';
import { AuthControllers } from '../controllers/authController';
import { protectedRoute } from '../middleware/auth';

const router = Router();

router.get('/me', AuthControllers.getMe);

router.post('/callback', AuthControllers.authCallback);

const authRoutes = router;

export default authRoutes;
