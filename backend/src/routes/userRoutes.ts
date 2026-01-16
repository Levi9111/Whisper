import { Router } from 'express';
import { protectedRoute } from '../middleware/auth';
import { UserControllers } from '../controllers/userController';

const router = Router();

router.get('/', protectedRoute, UserControllers.getUser);

const userRoutes = router;

export default userRoutes;
