import { getSiteSettingsData } from '@/data'
import Image from 'next/image'

export default async function Logo() {
  const siteSettingsData = await getSiteSettingsData()
  const logo =
    siteSettingsData && typeof siteSettingsData.logo === 'object' ? siteSettingsData.logo : null

  if (!logo?.url) return null

  return (
    <Image
      src={logo.url}
      alt={logo.alt || ''}
      width={logo.width || 80}
      height={logo.height || 50}
      className="h-auto shrink-0 object-contain"
      style={{ width: 'clamp(48px, 8vw, 80px)' }}
    />
  )
}
