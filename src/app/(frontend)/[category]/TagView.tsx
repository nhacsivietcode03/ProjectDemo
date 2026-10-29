import { ArticleListItem } from "@/components/article"
import { HeaderTitle } from "@/components/common"
import getArticlesByTag from "@/data/getArticlesByTag"
import { Article } from "@/payload-types"

type TagViewProps = {
    param: string
}

export default async function TagView({ param }: TagViewProps) {
    const articleList = await getArticlesByTag(param)
    if (articleList.length === 0) {
        return <div>Không tìm thấy bài viết thuộc tag này</div>
    }
    return <div>
        <HeaderTitle title={param} />
        {
            articleList && articleList.map((article: Article) => (
                <ArticleListItem key={article.id} article={article} />
            ))
        }
    </div>
}