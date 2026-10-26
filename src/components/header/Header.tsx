import Image from 'next/image'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { SocialMediaIcon, Logo, AdSlot, LinkAdvertisement } from '@/components/common'
import NavigationBar from './NavigationBar'
import NewsCarousel from './NewsCarousel'
import Trending from './Trending'
import MobileMenu from '../mobile/MobileMenu' // <--- Import Component mới
import { getHeader } from '@/data'
import getSiteSettingsData from '@/data/getSiteSettingsData'
import { VideoAdvertisement } from '../Video'
import { ThemeSwitcher, MalaysiaTime } from '../common'
import { Suspense } from 'react'
import SubNavigationBar from './SubNavigationBar'
import HeaderAd from './HeaderAd'
import Link from 'next/link'

export default async function Header() {
  const { categoryData, headerGlobalData, navBarData } = await getHeader()
  const siteSettingsData = await getSiteSettingsData()

  const siteTitle =
    headerGlobalData?.siteTitle && typeof headerGlobalData.siteTitle === 'object'
      ? headerGlobalData.siteTitle
      : null
  const carousels = headerGlobalData?.caroselItems || []

  const videoAd =
    siteSettingsData?.videoAdvertisement && typeof siteSettingsData.videoAdvertisement === 'object'
      ? siteSettingsData.videoAdvertisement
      : null
  const linkAdvertisement = siteSettingsData?.linkAdvertisement ?? null

  return (
    <header className="w-full">
      <div
        data-mobile-header
        className="container flex justify-between border-b border-gray-200 dark:border-gray-700 dark:bg-[#444444] dark:text-white"
      >
        <Link href={'/'} className='flex min-w-0 flex-1 items-center gap-3 p-2'>
          <Logo />
          {siteTitle?.url && (
            <Image
              src={siteTitle.url}
              alt={siteTitle.alt || ''}
              width={siteTitle.width || 360}
              height={siteTitle.height || 50}
              className="h-auto max-w-full min-w-0 object-contain"
              style={{ width: 'min(360px, 45vw)' }}
            />
          )}
        </Link>
        {/* Right top bar - DESKTOP ONLY: Ẩn hoàn toàn trên Mobile */}
        <div className="hidden lg:block">
          <Suspense fallback={'...'}>
            <MalaysiaTime />
          </Suspense>
          <div className="flex gap-3 pt-2">
            <div className="mr-6 flex items-center gap-2">
              <SocialMediaIcon />
            </div>
            <ThemeSwitcher />
          </div>
        </div>

        {/* Right top bar - MOBILE ONLY: Icon User và Hamburger Menu */}
        <div className="flex items-center p-2 lg:hidden">
          <MobileMenu
            category={categoryData}
            navBar={navBarData}
            socialMediaNode={<SocialMediaIcon />}
          />
        </div>
      </div>

      {/* Thanh Menu Ngang - DESKTOP ONLY */}
      <div className="container hidden h-13 items-center justify-between lg:flex">
        <Suspense fallback="">
          <NavigationBar category={categoryData} navBar={navBarData} />
        </Suspense>
        <div className="relative flex items-center">
          <input placeholder="Cari kata kunci" className="w-60 rounded border bg-gray-100 p-0.5" />
          <FaMagnifyingGlass className="absolute right-3 cursor-pointer" size={16} />
        </div>
      </div>
      <div className="px- hidden w-full bg-[#D31145] lg:block">
        <Suspense>
          <SubNavigationBar categoryData={categoryData} />
        </Suspense>
      </div>

      <div>
        <NewsCarousel carousel={carousels} />
      </div>
      <Suspense fallback={null}>
        <Trending />
      </Suspense>
      <Suspense>
        <HeaderAd
          desktopAd={<AdSlot slot="970x90" width={970} height={90} className="hidden lg:block" />}
          mobileAd={<AdSlot slot="320x100" width={320} height={100} className="lg:hidden" />}
        />
      </Suspense>
      {
        videoAd && (
          <Suspense fallback={null}>
            <VideoAdvertisement youtubeId={videoAd.youtubeId} />
          </Suspense>
        )
      }
      {linkAdvertisement && <LinkAdvertisement advertisement={linkAdvertisement} />}
    </header >
  )
}
