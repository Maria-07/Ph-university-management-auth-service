import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { loggerError, loggerInfo } from './shared/logger'

const uri = config.database_url as string
// console.log(uri);

async function bootstrap() {
  try {
    await mongoose.connect(uri)
    loggerInfo.info('🛢 database connection successful✨')

    app.listen(config.port, () => {
      loggerInfo.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    loggerError.error('Failed to connect Database')
  }
}

bootstrap()
