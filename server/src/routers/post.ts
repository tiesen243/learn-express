import { Router } from 'express'

import { postService } from '../services/post'

export const postRouter = Router()

// [GET] /api/post
postRouter.get('/', postService.getPosts.bind(postService))

// [GET] /api/post/:id
postRouter.get('/:id', postService.getPost.bind(postService))

// [POST] /api/post
postRouter.post('/', postService.createPost.bind(postService))

// [PATCH] /api/post/:id
postRouter.patch('/:id', postService.updatePost.bind(postService))

// [DELETE] /api/post/:id
postRouter.delete('/:id', postService.deletePost.bind(postService))
