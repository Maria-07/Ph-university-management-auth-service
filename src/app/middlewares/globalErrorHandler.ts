import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/handleValidationError'
import { IGenericErrorMassage } from '../../interfaces/error'

//global Error Handler
const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: IGenericErrorMassage[] = []

  if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
