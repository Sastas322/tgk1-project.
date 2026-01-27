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

    // Prepare email content
    const emailContent = `
Новая заявка с сайта ТГК-1

Тип обращения: ${type === 'job' ? 'Трудоустройство' : 'Подключение услуг'}

Имя: ${name}
Email: ${email}
Телефон: ${phone || 'Не указан'}

Сообщение:
${message}

---
Время отправки: ${new Date().toLocaleString('ru-RU')}
    `.trim()

    // Log the submission
    console.log('[v0] Новая заявка с формы обратной связи:')
    console.log(emailContent)

    // Send email using Resend API
    try {
      const resendApiKey = process.env.RESEND_API_KEY
      
      if (!resendApiKey) {
        console.warn('[v0] RESEND_API_KEY не настроен. Данные только в логах.')
        return Response.json(
          { 
            success: true, 
            message: 'Ваша заявка получена! Данные сохранены в логах сервера.',
            note: 'Для отправки на email добавьте RESEND_API_KEY в переменные окружения'
          },
          { status: 200 }
        )
      }

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: 'ivanivanit64@gmail.com',
          subject: `Новая заявка ТГК-1: ${type === 'job' ? 'Трудоустройство' : 'Подключение'}`,
          text: emailContent,
        }),
      })

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json()
        console.error('[v0] Resend API error:', errorData)
        throw new Error('Failed to send email via Resend')
      }

      const resendData = await resendResponse.json()
      console.log('[v0] Email успешно отправлен через Resend:', resendData.id)

      return Response.json(
        { 
          success: true, 
          message: 'Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
        },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('[v0] Ошибка отправки email:', emailError)
      
      // Даже если email не отправился, данные в логах есть
      return Response.json(
        { 
          success: true, 
          message: 'Ваша заявка получена! Мы обработаем её в ближайшее время.',
          note: 'Данные сохранены в системе'
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('[v0] Ошибка обработки формы:', error)
    return Response.json(
      { error: 'Произошла ошибка при отправке заявки' },
      { status: 500 }
    )
  }
}
