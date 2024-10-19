import type { NextFunction, Request, Response } from 'express'

export const logger = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') next()

  let methodColor = '\x1b[32m'
  switch (req.method) {
    case 'GET':
      methodColor = '\x1b[33m'
      break
    case 'POST':
      methodColor = '\x1b[34m'
      break
    case 'PATCH':
      methodColor = '\x1b[36m'
      break
    case 'DELETE':
      methodColor = '\x1b[31m'
      break
  }

  let codeColor = '\x1b[32m'
  if (res.statusCode >= 400) codeColor = '\x1b[31m'

  const startTime = new Date()

  res.once('finish', () => {
    const execTime = new Date().valueOf() - startTime.valueOf()
    console.log(
      `${codeColor}${res.statusCode}\x1b[0m ${methodColor}[${req.method}]\x1b[0m ${req.originalUrl} took ${execTime}ms to execute`,
    )
    if (Object.keys(req.query).length) console.log('Query:', req.query)
    if (req.body) console.log('Body:', req.body)
  })

  next()
}
