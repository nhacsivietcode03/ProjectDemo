import { getGlobalsData } from '@/data'
import Image from 'next/image'

export default async function Logo() {
  const { siteSettingsData } = await getGlobalsData()
  const Logo =
    siteSettingsData && typeof siteSettingsData.logo === 'object' ? siteSettingsData.logo : null
  return <Image src={Logo?.url || ''} alt={Logo?.alt || ''} width={80} height={50} priority />
}
