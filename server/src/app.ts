import type { Application } from 'express'
import cors from 'cors'
import express from 'express'

import { db } from './lib/db'
import { logger } from './middleware/logger'
import { zodMiddleware } from './middleware/zod'
import { postRouter } from './routers/post'

const bootstrap = async () => {
  const app: Application = express()

  // Before request
  app.use(cors())
  app.use(express.json())
  app.use(logger)
  app.use(async (req, _, next) => {
    req.db = db
    next()
  })

  // Routes
  app.use('/api/post', postRouter)

  // After request
  app.use(zodMiddleware)

  app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT ?? 3000}`)
  })
}

await bootstrap()
