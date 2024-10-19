import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { PostCard } from '@/components/post-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const App: React.FC = () => {
  const queryClient = useQueryClient()
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('http://localhost:3000/api/post')
        .then((res) => res.json() as Promise<{ data: Post[] }>)
        .then((data) => data.data),
  })

  const createPost = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const res = await fetch('http://localhost:3000/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(e.target as HTMLFormElement))),
      })

      if (!res.ok) return ((await res.json()) as { errors: Record<string, string> }).errors
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  return (
    <main className="container mx-auto max-w-screen-md py-4">
      <form className="mb-4 space-y-4" onSubmit={createPost.mutate}>
        <div className="space-y-2">
          <Label>Title</Label>

          <Input name="title" />
          <span className="text-xs text-destructive">{createPost.data?.title}</span>
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <Input name="content" />
          <span className="text-xs text-destructive">{createPost.data?.content}</span>
        </div>

        <Button className="w-full" disabled={createPost.isPending}>
          {createPost.isPending ? 'Creating...' : 'Create Post'}
        </Button>
      </form>

      <section className="grid grid-cols-2 gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </section>
    </main>
  )
}
