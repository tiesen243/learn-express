import { PrismaClient } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";

export const createContext = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  req.db = new PrismaClient();
  next();
};
