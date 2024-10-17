'use client'

import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

export const Post = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/post')
      return response.json() as Promise<{ data: { id: string; title: string; content: string }[] }>
    },
  })

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['createPost'],
    mutationFn: async (formData: FormData) => {
      const data = {
        title: formData.get('title'),
        content: formData.get('content'),
      }
      console.log(data)
      const response = await fetch('http://localhost:3001/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.get('title'),
          content: formData.get('content'),
        }),
      })
      return response.json()
    },
  })

  console.log(error)

  return (
    <>
      <section>
        <h1>Posts</h1>
        <ul>
          {isLoading || !posts ? (
            <li>Loading...</li>
          ) : (
            posts.data.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </li>
            ))
          )}
        </ul>
      </section>

      <form action={mutate}>
        <label>
          Title
          <input type="text" name="title" />
        </label>

        <label>
          Content
          <textarea name="content" />
        </label>

        <button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create'}
        </button>
      </form>
    </>
  )
}
