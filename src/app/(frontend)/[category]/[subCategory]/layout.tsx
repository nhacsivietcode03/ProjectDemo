
export default function Layout({ children, sidebar }: { children: React.ReactNode, sidebar: React.ReactNode }) {
    return <div className="container mt-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="lg:col-span-8">
                {children}
            </div>
            <div className="lg:col-span-4">
                {sidebar}
            </div>
        </div>
    </div>
}