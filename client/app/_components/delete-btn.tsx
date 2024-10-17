import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'

export const DeleteBtn: React.FC<{ id: string }> = ({ id }) => {
  const queryClient = useQueryClient()
  const deletePost = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3001/post/${id}`, { method: 'DELETE' })
      if (!response.ok) throw await response.json()
      return response.json()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  return (
    <Button
      variant="ghost"
      className="absolute right-2 top-2"
      onClick={() => deletePost.mutate()}
      disabled={deletePost.isPending}
    >
      Delete
    </Button>
  )
}
