import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Cấm bot vào thư mục admin (nếu có)
    },
    sitemap: 'https://project-demo-silk-ten.vercel.app/sitemap.xml',
  }
}
