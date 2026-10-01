import fs from 'fs'

// Đường dẫn API của Payload CMS
const PAYLOAD_URL = 'http://localhost:3000/api/articles'
// const API_KEY = 'ĐIỀN_TOKEN_HOẶC_API_KEY_NẾU_CẦN';

async function seedData() {
  try {
    // 1. Đọc dữ liệu từ file JSON
    const rawData = fs.readFileSync('data.json', 'utf-8')
    const articles = JSON.parse(rawData)

    console.log(`Đang chuẩn bị thêm ${articles.length} bài viết...`)

    // 2. Vòng lặp bắn API (fetch đã được tích hợp sẵn trên Node.js v18+)
    for (const [index, article] of articles.entries()) {
      const response = await fetch(PAYLOAD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `JWT ${API_KEY}`
        },
        body: JSON.stringify(article),
      })

      if (response.ok) {
        console.log(`✅ Đã thêm thành công bài ${index + 1}: ${article.title}`)
      } else {
        const error = await response.json()
        console.error(`❌ Lỗi ở bài ${index + 1}:`, error)
      }
    }

    console.log('🎉 Hoàn tất quá trình seed dữ liệu!')
  } catch (err) {
    console.error('Lỗi hệ thống:', err)
  }
}

seedData()
