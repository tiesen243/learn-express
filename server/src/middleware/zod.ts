import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export const zodMiddleware = (err: Error, _: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError)
    res.status(400).json({
      message: 'Validation failed',
      errors: Object.fromEntries(
        Object.entries(err.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]]),
      ),
    })
  else next(err)
}
