import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import usersRouter from './app/modules/users/user.route'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes
// console.log(process.env.DATABASE_URL)

app.use('/api/v1/user', usersRouter)

//testing purpose
// app.get('/', async (req: Request, res: Response) => {
//   // res.send('Working successfully')
//   throw new Error('User not found')
// })
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working successfully')
//   // next('User not found') //Error
//   throw new Error('User not found')
// })

// global error handler
app.use(globalErrorHandler)

export default app
