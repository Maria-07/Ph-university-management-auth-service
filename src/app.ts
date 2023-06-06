import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes
// console.log(process.env.DATABASE_URL)

app.use('/api/v1/user', UserRoutes)

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
app.use(globalErrorHandler)

export default app
