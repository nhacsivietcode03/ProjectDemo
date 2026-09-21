import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'

import getSiteSettings from '@/data/common/getSiteSettings'

const socialPlatforms = [
  { platform: 'facebook', Icon: FaFacebook },
  { platform: 'x', Icon: FaXTwitter },
  { platform: 'instagram', Icon: FaInstagram },
  { platform: 'youtube', Icon: FaYoutube },
  { platform: 'linkedin', Icon: FaLinkedin },
  { platform: 'tiktok', Icon: FaTiktok },
] as const

export default async function SocialMediaIcon() {
  const siteSettingData = await getSiteSettings()
  const socialMedias = siteSettingData.socialMediaLinks ?? []

  return (
    <div className="flex items-center gap-3">
      {socialPlatforms.map(({ platform, Icon }) => {
        const social = socialMedias.find((item) => item.platform === platform)

        return (
          <a
            key={platform}
            href={social?.url || '#'}
            target={social?.url ? '_blank' : undefined}
            rel={social?.url ? 'noreferrer noopener' : undefined}
            aria-label={platform}
            title={platform}
            className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-[#111] text-white transition-colors hover:bg-red-600"
          >
            <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
          </a>
        )
      })}
    </div>
  )
}
