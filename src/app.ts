import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json()); // request body parser
app.use(cors());

// application routes

// notFound handler

// error handler

export default app;