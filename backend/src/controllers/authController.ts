import type { NextFunction, Request, Response } from 'express';
import type { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';
import { clerkClient, getAuth } from '@clerk/express';

const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId).select(
      '-__v -createdAt -updatedAt -clerkId',
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const authCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId);

      user = await User.create({
        clerkId,
        name: clerkUser.firstName
          ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim()
          : clerkUser.emailAddresses[0]?.emailAddress.split('@')[0],
        email: clerkUser.emailAddresses[0]?.emailAddress,
        avatar: clerkUser.imageUrl,
      });

      return res.status(201).json(user);
    }
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

export const AuthControllers = {
  getMe,
  authCallback,
};
