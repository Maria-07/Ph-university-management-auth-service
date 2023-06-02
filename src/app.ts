import { Application, Request, Response } from 'express'
import usersRouter from './app/modules/users/user.route'
import cors from 'cors'
import express from 'express'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes

app.use('/api/v1/user', usersRouter)

//testing purpose
app.get('/', async (req: Request, res: Response) => {
  res.send('Working successfully')
})

export default app
