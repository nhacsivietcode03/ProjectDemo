import { ArticleListItem } from "@/components/article"
import { HeaderTitle } from "@/components/common"
import getArticlesBySubCategorySlug from "@/data/getArticlesBySubCategorySlug"
import { Article } from "@/payload-types"

type SubCategoryDetailProps = {
    params: Promise<{ category: string, subCategory: string }>
}

export default async function SubCategoryDetail({ params }: SubCategoryDetailProps) {
    const { category, subCategory } = await params
    const articleList = await getArticlesBySubCategorySlug(subCategory, category, 15)
    if (!articleList || articleList.length === 0) {
        return null
    }
    return <div>
        <HeaderTitle title={subCategory} />
        {articleList && articleList?.map((article: Article) => (
            <ArticleListItem key={article.id} article={article} />
        ))}
    </div>
} 