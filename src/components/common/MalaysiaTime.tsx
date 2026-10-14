'use client'

import { useState, useEffect } from 'react'

export default function MalaysiaTime() {
  const [time, setTime] = useState<string>('') // Khởi tạo rỗng để Server và Client lúc đầu đều giống nhau

  useEffect(() => {
    // useEffect CHỈ chạy trên trình duyệt (Client), Server không bao giờ chạy vào đây
    const timeString = new Intl.DateTimeFormat('ms-MY', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kuala_Lumpur',
    })
      .format(new Date())
      .replace(' pada ', ', ')
      .replace(' PG', ' am')
      .replace(' PTG', ' pm')

    setTime(timeString)
  }, [])

  // Lúc Server render, nó chỉ trả về một khoảng trống hoặc chữ Loading.
  // Nhờ vậy Server và Client không bị cãi nhau.
  if (!time) {
    return <p className="p-2 text-right text-sm text-transparent">Đang tải...</p>
  }

  return <p className="p-2 text-right text-sm">{time}</p>
}
