import { ArticleItem } from '@/data/homepage/getMainHomePageData'
import HeaderTitle from '../common/HeaderSection'
import Link from 'next/link'
import Image from 'next/image'
import { CommonArticle } from '../article'

type DisyorkanProps = {
  disyorkanData: ArticleItem[]
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
        {/* Ảnh */}
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
              <h2 className="line-clamp-3 text-xl leading-snug font-semibold text-black transition-colors group-hover:text-red-600 sm:text-2xl">
                {firstArticle.title}
              </h2>
            </div>
          </Link>
        </div>

        {/*6 bài viết bên phải*/}
        <div className="col-span-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <CommonArticle articlesData={listArticles} />
          </div>
        </div>
      </div>
    </section>
  )
}
