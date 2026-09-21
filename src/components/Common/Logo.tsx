import getSiteSettings from '@/data/common/getSiteSettings'
import Image from 'next/image'

export default async function Logo() {
  const siteSettings = await getSiteSettings()
  const Logo = siteSettings && typeof siteSettings.logo === 'object' ? siteSettings.logo : null
  return <Image src={Logo?.url || ''} alt={Logo?.alt || ''} width={80} height={50} priority />
}
