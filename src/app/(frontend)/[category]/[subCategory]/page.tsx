import { Suspense } from "react"
import SubCategoryDetail from "./SubCategoryDetail"

type SubCategoryPageProps = PageProps<'/[category]/[subCategory]'>

export default function SubCategoryPage({ params }: SubCategoryPageProps) {
  return (
    <div>
      <Suspense>
        <SubCategoryDetail params={params} />
      </Suspense>
    </div>
  )
}
