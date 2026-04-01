import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, type } = body

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Неверный формат email' },
        { status: 400 }
      )
    }

    const typeText = type === 'job' ? 'Трудоустройство' : 'Подключение услуг'

    // HTML email content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #374151; }
    .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #e5e7eb; }
    .footer { padding: 15px; background: #f3f4f6; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }
    .badge { display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Новая заявка с сайта ТГК-1</h1>
      <span class="badge" style="background: rgba(255,255,255,0.2); color: white; margin-top: 10px;">${typeText}</span>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Имя:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Телефон:</div>
        <div class="value">${phone || 'Не указан'}</div>
      </div>
      <div class="field">
        <div class="label">Сообщение:</div>
        <div class="value">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      Отправлено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} (МСК)<br>
      Это автоматическое сообщение с сайта ТГК-1
    </div>
  </div>
</body>
</html>
    `.trim()

    const textContent = `
Новая заявка с сайта ТГК-1

Тип обращения: ${typeText}

Имя: ${name}
Email: ${email}
Телефон: ${phone || 'Не указан'}

Сообщение:
${message}

---
Время отправки: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} (МСК)
    `.trim()

    // Check for Gmail credentials
    const gmailUser = process.env.GMAIL_USER
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

    if (!gmailUser || !gmailAppPassword) {
      console.log('[v0] Gmail credentials not configured. Form data:')
      console.log(textContent)
      return Response.json(
        { 
          success: true, 
          message: 'Заявка получена! Настройте GMAIL_USER и GMAIL_APP_PASSWORD для отправки на почту.',
        },
        { status: 200 }
      )
    }

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    })

    // Send email
    await transporter.sendMail({
      from: `"Сайт ТГК-1" <${gmailUser}>`,
      to: 'ivanivanit64@gmail.com',
      replyTo: email,
      subject: `Новая заявка: ${typeText} — ${name}`,
      text: textContent,
      html: htmlContent,
    })

    console.log('[v0] Email успешно отправлен на ivanivanit64@gmail.com')

    return Response.json(
      { 
        success: true, 
        message: 'Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('[v0] Ошибка отправки:', error)
    return Response.json(
      { error: 'Произошла ошибка при отправке заявки. Попробуйте позже.' },
      { status: 500 }
    )
  }
}
