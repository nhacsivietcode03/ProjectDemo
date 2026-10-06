import Image from 'next/image'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { SocialMediaIcon, Logo, AdSlot, LinkAdvertisement } from '@/components/common'
import NavigationBar from './NavigationBar'
import NewsCarousel from './NewsCarousel'
import Trending from './Trending'
import { getGlobalsData, getHeader } from '@/data'
import { VideoAdvertisement } from '../Video'

export default async function Header() {
  const { categoryData, headerGlobalData, navBarData } = await getHeader()
  const { siteSettingsData } = await getGlobalsData()
  console.log(siteSettingsData)
  const siteTitle =
    headerGlobalData && typeof headerGlobalData.siteTitle === 'object'
      ? headerGlobalData.siteTitle
      : null
  const carousels = headerGlobalData.caroselItems || []

  const videoAd =
    siteSettingsData.videoAdvertisement && typeof siteSettingsData.videoAdvertisement === 'object'
      ? siteSettingsData.videoAdvertisement
      : null
  const linkAdvertisement = siteSettingsData.linkAdvertisement ?? null

  return (
    <header className="w-full">
      <div className="container flex justify-between border-b border-gray-200">
        {/*Left Top bar*/}
        <div className="flex w-1/2 min-w-0 items-center gap-3 p-2">
          {/*logo*/}
          <Logo />
          {siteTitle?.url && (
            <Image
              src={siteTitle.url}
              alt={siteTitle.alt || ''}
              width={siteTitle.width || 360}
              height={siteTitle.height || 50}
              sizes="(max-width: 640px) 50vw, 360px"
              className="h-auto max-w-full min-w-0 flex-1 object-contain"
            />
          )}
        </div>
        {/*Right top bar*/}
        <div>
          {/* Time */}
          <p className="p-2 text-right text-sm">
            {new Intl.DateTimeFormat('ms-MY', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              timeZone: 'Asia/Kuala_Lumpur',
            })
              .format(new Date())
              .replace(' pada ', ', ')
              .replace(' PG', ' am')
              .replace(' PTG', ' pm')}
          </p>
          {/* Social icons + Theme toggle */}
          <div className="flex gap-3 pt-2">
            <div className="mr-6 flex items-center gap-2">
              <SocialMediaIcon />
            </div>
            <select className="text-gray-850 flex w-24 cursor-pointer justify-end rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs outline-none hover:border-gray-400">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container hidden h-13 items-center justify-between lg:flex">
        <NavigationBar category={categoryData} navBar={navBarData} />
        <div className="relative flex items-center">
          <input placeholder="Cari kata kunci" className="w-60 rounded border bg-gray-100 p-0.5" />
          <FaMagnifyingGlass className="absolute right-3 cursor-pointer text-gray-600" size={16} />
        </div>
      </div>
      <div>
        <NewsCarousel carousel={carousels} />
      </div>
      <Trending />
      <div className="container mt-4 w-full">
        <AdSlot slot="970x90" width={970} height={100} />
      </div>

      {videoAd && <VideoAdvertisement youtubeId={videoAd.youtubeId} />}
      {linkAdvertisement && <LinkAdvertisement advertisement={linkAdvertisement} />}
    </header>
  )
}
