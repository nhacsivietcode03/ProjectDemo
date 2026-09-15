import Image from 'next/image'
import type { Header as HeaderData, Media } from '@/payload-types'

type SocialMediaLink = NonNullable<HeaderData['socialMediaLinks']>[number]

type SocialMediaIconProps = {
  social: SocialMediaLink
}

export default function SocialMediaIcon({ social }: SocialMediaIconProps) {
  const icon =
    typeof social.icon === 'object' && social.icon !== null ? (social.icon as Media) : null

  if (!icon?.url) return null

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noreferrer"
      className="flex h-7 w-7 items-center justify-center hover:opacity-85"
      title={social.platform}
    >
      <Image
        src={icon.url}
        alt={icon.alt || social.platform}
        width={icon.width || 24}
        height={icon.height || 24}
      />
    </a>
  )
}
