import type { Application } from 'express'
import express from 'express'

import { db } from './lib/db'
import { postRouter } from './routers/post'

const bootstrap = async () => {
  const app: Application = express()

  // Middlewares
  app.use(express.json())
  app.use(async (req, _, next) => {
    req.db = db
    next()
  })

  // Routes
  app.use('/post', postRouter)

  app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT ?? 3000}`)
  })
}

await bootstrap()
