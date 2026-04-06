import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, type, website, timestamp } = body

    if (website && website.trim() !== '') {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const now = Date.now()
    const limit = rateLimitMap.get(ip)

    if (limit && now < limit.resetAt) {
      if (limit.count >= 3) {
        return NextResponse.json({ error: 'Слишком много запросов. Попробуйте через час.' }, { status: 429 })
      }
      limit.count += 1
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 })
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Некорректный email' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    })

    await transporter.sendMail({
      from: `"ТГК-1 Сайт" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `📩 Новая заявка: ${type === 'job' ? 'Трудоустройство' : 'Подключение услуг'}`,
      text: `Имя: ${name}\nEmail: ${email}\nТелефон: ${phone || 'не указан'}\nТип: ${type}\nСообщение: ${message}`,
    })

    return NextResponse.json({ message: 'Заявка успешно отправлена!' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}