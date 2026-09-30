import type { ArticleItem } from '@/data/homepage/getMainHomePageData'

export default function formatArticle(article: ArticleItem) {
  const image = typeof article.Image === 'object' ? article.Image : null

  const subCategory = article.subCategory?.[0]
  const subCategorySlug = typeof subCategory === 'object' ? subCategory?.slug : 'NASIONAL'
  const subCategoryTitle = typeof subCategory === 'object' ? subCategory?.title : 'NASIONAL'

  const mainCategory = article.category?.[0]
  const categorySlug = typeof mainCategory === 'object' ? mainCategory?.slug : null

  const date = new Date(article.createdAt)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const id = article.id
  const articleSlug = article.slug || ''

  const articleUrl = subCategory
    ? `/${categorySlug}/${subCategorySlug}/${year}/${month}/${id}/${articleSlug}`
    : `/${categorySlug}/${year}/${month}/${id}/${articleSlug}`

  return {
    image,
    subCategory,
    subCategorySlug,
    subCategoryTitle,
    articleUrl,
  }
}
