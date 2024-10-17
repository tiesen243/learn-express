'use client'

import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DeleteBtn } from './delete-btn'

export const Post: React.FC = () => {
  const [page, setPage] = useState<number>(1)

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['posts', page],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/post?page=${page}&limit=2`)
      if (!response.ok) throw await response.json()
      return response.json() as Promise<{
        data: { posts: { id: string; title: string; content: string }[]; totalPage: number }
      }>
    },
  })

  const createPost = useMutation({
    mutationKey: ['createPost'],
    mutationFn: async (formData: FormData) => {
      const response = await fetch('http://localhost:3001/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
      if (!response.ok)
        throw (await response.json()) as { message: string; errors: { [key: string]: string[] } }
      return response.json()
    },
    onSuccess: () => refetch(),
  })

  return (
    <>
      <form action={createPost.mutate} className="flex flex-col gap-4">
        <Label htmlFor="title">
          Title
          <Input type="text" name="title" className="my-2" />
          <p className="text-xs text-destructive">{createPost.error?.errors?.title}</p>
        </Label>

        <Label htmlFor="content">
          Content
          <Textarea name="content" className="my-2" />
          <p className="text-xs text-destructive">{createPost.error?.errors?.content}</p>
        </Label>

        <Button type="submit" disabled={createPost.isPending}>
          {createPost.isPending ? 'Creating...' : 'Create'}
        </Button>
      </form>

      <ul className="mt-4 space-y-4">
        {isLoading || !posts ? (
          <li>Loading...</li>
        ) : (
          posts.data.posts.map((post) => (
            <li key={post.id}>
              <Card className="relative">
                <DeleteBtn id={post.id} />
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.content}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))
        )}
      </ul>

      <div className="mt-4 flex items-center justify-center gap-4">
        <Button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {page} of {posts?.data.totalPage}
        </span>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= posts?.data.totalPage}
        >
          Next
        </Button>
      </div>
    </>
  )
}
