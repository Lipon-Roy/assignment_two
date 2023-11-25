import express, { Router } from 'express';
import { userController } from './user.controller';

const router: Router = express.Router();

router.post('/', userController.createUser);

export const userRouter = router;
