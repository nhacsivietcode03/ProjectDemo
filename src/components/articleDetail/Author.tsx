import getAuthorData from '@/data/getAuthorData'
import type { User } from '@/payload-types'
import Image from 'next/image'
import ArticleTime from '../article/ArticleTime'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa6'

type AuthorProps = {
  authorData: User
  articleDate: string
}

type SocialMediaLink = NonNullable<User['socialMediaLinks']>[number]

const socialPlatforms = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
} as const

export default async function Author({ authorData, articleDate }: AuthorProps) {
  const authorId = authorData.id
  if (!authorId) {
    return null
  }

  const author = await getAuthorData(authorId)
  const avatar = author && typeof author.avatar === 'object' ? author.avatar : null
  const socialLinks = author.socialMediaLinks ?? []

  return (
    <div className="my-4 flex flex-wrap items-center justify-between gap-4 dark:border-gray-700">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative h-15 w-15 shrink-0 overflow-hidden rounded-md border border-gray-300 dark:border-gray-600">
          {avatar?.url ? (
            <Image src={avatar.url} alt={avatar.alt || author.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-xl font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-200">
              {author.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-medium text-gray-900 dark:text-white">
          <span>{author.name}</span>
          <span aria-hidden="true">-</span>
          <ArticleTime date={articleDate} />
        </div>
      </div>

      {socialLinks.length > 0 && (
        <div className="flex items-center gap-3">
          {socialLinks.map((socialLink: SocialMediaLink) => {
            const { platform, url, id } = socialLink
            const Icon = socialPlatforms[platform]

            return (
              <a
                key={id ?? platform}
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={platform}
                title={platform}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111] text-white transition-colors hover:bg-red-600"
              >
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
