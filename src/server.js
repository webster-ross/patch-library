import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import {books, tokens} from './routers'

export default () => {
  const app = express()

  // setup middlewear
  app.use(helmet())
  app.use(bodyParser.json())

  // setup routes
  app.get('/', (req, res) => res.send('Hello Patch'))
  app.use('/books', books)
  app.use('/tokens', tokens)

  // default not found handler
  app.use((req, res, next) => res.sendStatus(404))

  // default error handler
  app.use((err, req, res, next) => {
    console.error(err)
    if (err.statusCode == 400) res.sendStatus(400)
    else res.sendStatus(500)
  })

  return app
}
