import type { NextFunction, Response } from 'express';
import type { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';

const getUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req;
    const users = await User.find({ _id: { $ne: userId } })
      .select('name email avatar')
      .limit(50);

    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

export const UserControllers = {
  getUser,
};
