import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await userServices.createUser(userData);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: {
        userId: result.userId,
        username: result.username,
        fullName: result.fullName,
        age: result.age,
        email: result.email,
        isActive: result.isActive,
        hobbies: result.hobbies,
        address: result.address,
        orders: result.orders,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        data: null,
      });
    }
  }
};

export const userController = {
  createUser,
};
