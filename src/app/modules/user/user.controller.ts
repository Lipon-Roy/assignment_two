import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';
import { ZodError } from 'zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const validatedUserData = userValidationSchema.parse(userData);

    const result = await userServices.createUser(validatedUserData);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    // zod error checking
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: 'Your input data is wrong',
        error: err.errors,
      });
    } else if (err instanceof Error) {
      // common error checking
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        data: null,
      });
    }
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
        data: null,
      });
    }
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await userServices.getSingleUser(Number(userId));

    if (!user) {
      throw 'Not Found';
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (err) {
    if (err === 'Not Found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    else if (err instanceof Error) {
      res.status(404).json({
        success: false,
        message: err.message || 'Internal server error',
        data: null
      });
    }
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
