import type { Request, Response } from 'express'

import { PostDto } from '../dto/post'

class PostService {
  constructor(private postDto: PostDto = new PostDto()) {}

  async getPosts(req: Request, res: Response) {
    const posts = await req.db.post.findMany({ orderBy: { createdAt: 'desc' } })
    if (posts.length <= 0) res.status(404).json({ data: [], message: 'No posts found' })
    res.json({ data: posts, message: 'Posts fetched successfully' })
  }

  async getPost(req: Request, res: Response) {
    const post = await req.db.post.findUnique({ where: { id: req.params.id } })
    if (!post) res.status(404).json({ data: null, message: 'Post not found' })
    res.json({ data: post, message: 'Post fetched successfully' })
  }

  async createPost(req: Request, res: Response) {
    const data = this.postDto.createPost.parse(req.body)
    const post = await req.db.post.create({ data })
    res.status(201).json({ data: post, message: 'Post created successfully' })
  }

  async updatePost(req: Request, res: Response) {
    const post = await req.db.post.findUnique({ where: { id: req.params.id } })
    if (!post) {
      res.status(404).json({ message: 'Post not found' })
      return
    }

    const data = this.postDto.updatePost.parse(req.body)
    await req.db.post.update({ where: { id: req.params.id }, data })
    res.json({ data: null, message: 'Post updated successfully' })
  }

  async deletePost(req: Request, res: Response) {
    const post = await req.db.post.findUnique({ where: { id: req.params.id } })
    if (!post) {
      res.status(404).json({ message: 'Post not found' })
      return
    }

    await req.db.post.delete({ where: { id: req.params.id } })
    res.json({ message: 'Post deleted successfully' })
  }
}

export const postService = new PostService()
