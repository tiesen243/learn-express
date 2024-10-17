import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodObject } from "zod";

export const validator =
  (schema: ZodObject<any, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof ZodError)
        res.sendStatus(400).json({
          message: "Validation Error",
          errors: e.flatten().fieldErrors,
        });
      else res.sendStatus(500).json({ error: "Internal Server Error" });
    }
  };
