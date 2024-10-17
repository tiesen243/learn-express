import type { NextPage } from 'next'

import { Post } from './_components/post'

const Page: NextPage = async () => (
  <main className="container py-4">
    <Post />
  </main>
)

export default Page
