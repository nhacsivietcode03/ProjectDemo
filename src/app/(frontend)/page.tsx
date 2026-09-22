import MainSideBar from '@/components/sidebar/MainSideBar'

export default async function HomePage() {
  return (
    <div className="container pt-5">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
        {/* Phần nội dung chính */}
        <div className="lg:col-span-8"></div>
        {/* Phần nội dung sideBar */}
        <div className="lg:col-span-4">
          <MainSideBar />
        </div>
      </div>
    </div>
  )
}
