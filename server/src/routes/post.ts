import { Router } from "express";
import { validator } from "../middleware/validator";
import { z } from "zod";

export const postRouter = Router();

postRouter.post(
  "/",
  validator(
    z.object({
      title: z.string(),
      content: z.string(),
    }),
  ),
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
