'use client'

import { usePathname } from 'next/navigation'

export default function HeaderAd({
  desktopAd,
  mobileAd,
}: {
  desktopAd: React.ReactNode
  mobileAd: React.ReactNode
}) {
  const pathname = usePathname()
  const isArticlePage = pathname.split('/').filter(Boolean).length >= 3

  return (
    <div className="container mt-4 h-[100px] w-full lg:h-[90px]">
      {/* Luôn render quảng cáo Desktop */}
      {desktopAd}

      {/* Chỉ render quảng cáo Mobile nếu KHÔNG PHẢI trang chi tiết */}
      {!isArticlePage && mobileAd}
    </div>
  )
}
