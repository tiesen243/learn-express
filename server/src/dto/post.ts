import { z } from 'zod'

export class PostDto {
  createPost = z.object({
    title: z.string().min(4),
    content: z.string().min(10),
  })

  updatePost = z.object({
    title: z.string().min(4).optional(),
    content: z.string().min(10).optional(),
  })
}
