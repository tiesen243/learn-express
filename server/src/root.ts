import { Router } from "express";
import { postRouter } from "./routes/post";

export const appRouter = Router();

appRouter.use("/post", postRouter);
