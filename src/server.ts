import mongoose from 'mongoose'
import app from './app'
import config from './config'

const uri = config.database_url as string
// console.log(uri);

async function bootstrap() {
  try {
    await mongoose.connect(uri)
    console.log('🛢 database connection successful✨')

    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)

    console.log('Failed to connect Database')
  }
}

bootstrap()
