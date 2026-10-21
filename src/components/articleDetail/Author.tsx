import { User } from '@/payload-types'

type AuthorProps = {
  authorData: User
}

export default async function Author({ authorData }: AuthorProps) {
  const authorId = authorData.id
  if (!authorId) {
    return
  }

  return <div></div>
}
