import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json()); // request body parser
app.use(cors());

// application routes
app.use('/api/users', userRouter);

// notFound handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Not found',
    error: {
      code: 404,
      description: 'Your requested content was not found',
    },
  });
});

export default app;
