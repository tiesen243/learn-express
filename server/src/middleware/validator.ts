import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject, ZodError } from "zod";

interface ValidatorParams {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

const formatZodError = (error: ZodError) =>
  Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
      key,
      value?.[0],
    ]),
  );

export const validator =
  ({ params, body, query }: ValidatorParams) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (params) {
      const parsed = params.safeParse(req.params);
      if (!parsed.success)
        res.sendStatus(400).json({
          message: "Validation error",
          errors: formatZodError(parsed.error),
        });
      // @ts-ignore
      req.params = parsed.data;
      next();
    }

    if (body) {
      const parsed = body.safeParse(req.body);
      if (!parsed.success)
        res.status(400).json({
          message: "Validation error",
          errors: formatZodError(parsed.error),
        });
      req.body = parsed.data;
      next();
    }

    if (query) {
      const parsed = query.safeParse(req.query);
      if (!parsed.success)
        res.status(400).json({
          message: "Validation error",
          errors: formatZodError(parsed.error),
        });
      // @ts-expect-error
      req.query = parsed.data;
      next();
    }
  };
