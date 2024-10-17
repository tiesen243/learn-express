import { Router } from "express";
import { z } from "zod";
import { validator } from "../middleware/validator";

export const postRouter = Router();

postRouter.get(
  "/",
  validator({
    query: z.object({
      page: z
        .string()
        .default("1")
        .transform((val) => Number(val)),
      limit: z
        .string()
        .default("10")
        .transform((val) => Number(val)),
    }),
  }),
  async (req, res) => {
    const posts = await req.db.post.findMany({
      take: Number(req.query.limit) ?? 10,
      skip: (Number(req.query.page) - 1) * Number(req.query.limit),
    });

    const totalPage =
      Math.ceil((await req.db.post.count()) / Number(req.query.limit)) || 0;

    res.json({
      data: { posts, totalPage },
      message: "Posts fetched successfully",
    });
  },
);

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

postRouter.delete(
  "/:id",
  validator({
    params: z.object({
      id: z.string(),
    }),
  }),
  async (req, res) => {
    await req.db.post.delete({
      where: { id: req.params.id },
    });

    res.json({
      message: "Post deleted successfully",
    });
  },
);
