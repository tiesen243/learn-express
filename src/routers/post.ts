import { Router } from 'express'

export const postRouter = Router()

postRouter.get('/', async (req, res) => {
  const posts = await req.db.post.findMany()

  if (posts.length <= 0) {
    res.status(404).json({
      data: [],
      message: 'No posts found',
    })
  }

  res.json({
    data: posts,
    message: 'Posts fetched successfully',
  })
})
