import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json()); // request body parser
app.use(cors());

// application routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({success: "Hello Assignment two"});
});

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

// error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  } else {
    next(err);
  }
});

export default app;
