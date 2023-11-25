import express, { Router } from 'express';
import { userController } from './user.controller';

const router: Router = express.Router();

router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getSingleUser);

router.put('/:userId', userController.updateSingleUser);

router.delete('/:userId', userController.deleteSingleUser);

router.put('/:userId/orders', userController.addNewProduct);

router.get('/:userId/orders', userController.getAllOrders);

export const userRouter = router;
