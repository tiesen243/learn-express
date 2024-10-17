'use client'

import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export const Post = () => {
  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/post')
      if (!response.ok) throw await response.json()
      return response.json() as Promise<{ data: { id: string; title: string; content: string }[] }>
    },
  })

  const { mutate, isPending, error } = useMutation({
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
      <form action={mutate} className="flex flex-col gap-4">
        <Label className="space-y-2">
          Title
          <Input type="text" name="title" />
          <p>{error?.errors?.title}</p>
        </Label>

        <Label className="space-y-2">
          Content
          <Textarea name="content" />
          <p>{error?.errors?.content}</p>
        </Label>

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </form>

      <ul>
        {isLoading || !posts ? (
          <li>Loading...</li>
        ) : (
          posts.data.map((post) => (
            <li key={post.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.content}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))
        )}
      </ul>
    </>
  )
}
