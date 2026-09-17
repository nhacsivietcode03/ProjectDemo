import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import type { Header as HeaderData } from '@/payload-types'

type SocialMediaLink = NonNullable<HeaderData['socialMediaLinks']>[number]

type SocialMediaIconProps = {
  social: SocialMediaLink
}

export default function SocialMediaIcon({ social }: SocialMediaIconProps) {
  const icons: Record<SocialMediaLink['platform'], IconType> = {
    facebook: FaFacebook,
    x: FaXTwitter,
    instagram: FaInstagram,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
    tiktok: FaTiktok,
  }
  const Icon = icons[social.platform]

  if (!social.url || !Icon) return null

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={social.platform}
      title={social.platform}
      className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111] text-white transition-colors hover:bg-red-600"
    >
      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
    </a>
  )
}
