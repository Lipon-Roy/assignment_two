import express, { Router } from 'express';
import { userController } from './user.controller';

const router: Router = express.Router();

router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getSingleUser);

router.put('/:userId', userController.updateSingleUser);

export const userRouter = router;
