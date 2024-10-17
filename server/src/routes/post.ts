import { Router } from "express";
import { z } from "zod";
import { validator } from "../middleware/validator";

export const postRouter = Router();

postRouter.post(
  "/",
  validator({
    body: z.object({
      title: z.string().min(1, "Title is required"),
      content: z.string().min(4, "Content is required"),
    }),
  }),
  async (req, res) => {
    const post = await req.db.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });
    res.json({
      data: post,
      message: "Post created successfully",
    });
  },
);

postRouter.get("/", async (req, res) => {
  const posts = await req.db.post.findMany();

  res.json({
    data: posts,
    message: "Posts fetched successfully",
  });
});
