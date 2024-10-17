import type { NextFunction, Request, Response } from "express";

export const logger = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const color = res.statusCode >= 400 ? "\x1b[31m" : "\x1b[32m";
  const methodColor = (method: string) => {
    if (method === "GET") return "\x1b[34m";
    if (method === "POST") return "\x1b[32m";
    if (method === "PUT") return "\x1b[33m";
    if (method === "DELETE") return "\x1b[31m";
    return "\x1b[0m";
  };
  console.log(
    color,
    `${res.statusCode}`,
    methodColor(req.method),
    `[${req.method}]${7 - req.method.length > 0 ? " ".repeat(7 - req.method.length) : ""}`,
    "\x1b[0m",
    `${req.path} at ${new Date()}`,
  );
  next();
};
