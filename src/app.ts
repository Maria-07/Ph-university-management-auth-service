import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
// console.log(process.env.DATABASE_URL)

// app.use('/api/v1/user', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

app.use('/api/v1/', routes);

//testing purpose
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('testing new error logger')
//   //   throw new ApiError(400, 'User not found throw error')
// })
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   //   Promise.reject(new Error('UnHandle project rejection'))
//   console.log(x)
// })

// global error handler
app.use(globalErrorHandler);

// Handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
  next();
});

export default app;
