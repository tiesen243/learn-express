import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const queryClient = useQueryClient()
  const deletePost = useMutation({
    mutationFn: (_: React.MouseEvent<HTMLDivElement>) =>
      fetch(`http://localhost:3000/api/post/${post.id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })
  return (
    <Card
      key={post.id}
      className={cn('cursor-pointer hover:bg-secondary', {
        'bg-muted': deletePost.isPending,
      })}
      onClick={deletePost.mutate}
    >
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.content}</CardDescription>
      </CardHeader>
    </Card>
  )
}
