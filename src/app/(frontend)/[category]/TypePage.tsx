

import isCategoryPage from "@/data/isCategoryPage"
import CategoryView from "./CategoryView"
import TagView from "./TagView"
import { notFound } from "next/navigation"
import isTagPage from "@/data/isTagPage"

type TypePageProps = {
    params: Promise<{
        category: string
    }>
}

export default async function TypePage({ params }: TypePageProps) {
    const { category } = await params
    const [isCategoryPageData, isTagePageData] = await Promise.all([isCategoryPage(category), isTagPage(category)])

    if (isCategoryPageData) {
        return <CategoryView param={category} />
    }

    if (isTagePageData) {
        return <TagView param={category} />
    }

    notFound()
}
