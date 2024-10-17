import type { NextFunction, Request, Response } from "express";

export const logger = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const color = res.statusCode >= 400 ? "\x1b[31m" : "\x1b[32m";
  console.log(
    color,
    `[${req.method}]`,
    "\x1b[0m",
    `${req.path} at ${new Date()}`,
  );
  next();
};
