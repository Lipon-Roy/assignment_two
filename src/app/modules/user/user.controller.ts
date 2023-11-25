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

export const userController = {
  createUser,
};
