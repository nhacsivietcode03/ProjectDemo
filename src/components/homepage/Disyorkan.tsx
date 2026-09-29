import { DisyorKanItem } from '@/data/homepage/getMainHomePageData'
import HeaderTitle from '../common/HeaderSection'
import Link from 'next/link'
import Image from 'next/image'
import getTimeAgo from '@/utils/getTimeAgo'

type DisyorkanProps = {
  disyorkanData: DisyorKanItem[]
}

export default async function Disyorkan({ disyorkanData }: DisyorkanProps) {
  const heroArticle = disyorkanData.slice(0, 1)
  const listArticles = disyorkanData.slice(1, 8)

  const firstArticle = heroArticle[0] ?? null
  const firstArticleImage =
    firstArticle && typeof firstArticle.Image === 'object' ? firstArticle.Image : null

  return (
    <section className="mt-5">
      <HeaderTitle title="Disyorkan" label="Disyourkan" />
      <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="col-span-6">
          <Link href={`/berita/${firstArticle.slug || ''}`} className="group block">
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-200">
              {firstArticleImage?.url ? (
                <Image
                  src={firstArticleImage.url}
                  alt={firstArticleImage.alt}
                  fill
                  priority
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-800 text-sm text-gray-400">
                  No image
                </div>
              )}
            </div>

            {/* Nội dung bên dưới ảnh */}
            <div className="mt-4 w-full">
              <h2 className="line-clamp-3 text-xl leading-snug font-bold text-black transition-colors group-hover:text-red-600 sm:text-2xl">
                {firstArticle.title}
              </h2>
            </div>
          </Link>
        </div>
        {/*Nội dung bên phải */}
        <div className="col-span-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {listArticles.map((article) => {
              const image = typeof article.Image === 'object' ? article.Image : null
              const subCategory = article.subCategory?.[0]
              const subCategoryTitle =
                typeof subCategory === 'object' ? subCategory?.title : 'NASIONAL'
              return (
                <Link
                  key={article.id}
                  href={`/berita/${article.slug || ''}`}
                  className="group relative mb-8 block"
                >
                  {/* 1. Xóa style cứng, thêm w-full và aspect-[290/150] để cố định tỷ lệ khung hình */}
                  <div className="relative aspect-[290/150] w-full overflow-hidden">
                    {image?.url && (
                      <Image
                        src={image.url}
                        alt={image.alt || article.title}
                        // 2. Xóa width/height cứng, dùng fill để ảnh tự động lấp đầy khung tỷ lệ ở trên
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* 3. Sửa w-[290px] thành w-full để khối chữ cũng co giãn theo cột */}
                  <div className="w-full py-3">
                    <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
                      <p className="font-semibold text-red-600 uppercase">{subCategoryTitle}</p>
                      <p className="text-gray-400">{getTimeAgo(article.createdAt)}</p>
                    </div>

                    <h3 className="line-clamp-2 text-sm font-semibold text-black transition-colors group-hover:text-red-600">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
