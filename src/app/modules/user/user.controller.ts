import { Request, Response } from 'express';
import { userServices } from './user.service';
import {
  userValidationSchema,
  productValidationSchema,
} from './user.validation';
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
        message: 'Validation error',
        error: err.errors,
      });
    } else if (err instanceof Error) {
      // common error checking
      res.status(500).json({
        success: false,
        message: err.message,
        error: err,
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
      res.status(500).json({
        success: false,
        message: err.message,
        error: err,
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
        }
      });
    } else if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
        error: err
      });
    }
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;

    const validatedUserData = userValidationSchema.parse(userData);
    const user = await userServices.updateSingleUser(
      Number(userId),
      validatedUserData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: user,
    });
  } catch (err) {
    // zod error checking
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: err.errors,
      });
    } else if (err === 'Not Found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else if (err instanceof Error) {
      res.status(404).json({
        success: false,
        message: err.message,
        error: err,
      });
    }
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    await userServices.deleteSingleUser(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
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
    } else if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
        error: err
      });
    }
  }
};

const addNewProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const product = req.body;

    const validatedProductData = productValidationSchema.parse(product);// validate the product
    await userServices.addNewProduct(Number(userId), validatedProductData);// add the validated product into orders array

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
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
    } else if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: err.errors,
      });
    } else if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
        error: err
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const orders = await userServices.getAllOrders(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders,
      },
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
    } else if (err === 'Orders Undefined') {
      res.status(404).json({
        success: false,
        message: 'Orders Undefined',
        error: {
          code: 404,
          description: 'Yet, this user does not any order',
        },
      });
    } else if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
        error: err,
      });
    }
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const totalPrice = await userServices.getTotalPrice(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
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
    } else if (err === 'Orders Undefined') {
      res.status(404).json({
        success: false,
        message: 'Orders Undefined',
        error: {
          code: 404,
          description: 'Yet, this user does not any order',
        },
      });
    } else if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
        error: err,
      });
    }
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addNewProduct,
  getAllOrders,
  getTotalPrice,
};
