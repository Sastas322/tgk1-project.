/**
 * Lightweight static file server for local development.
 * Serves index.html plus all static assets (CSS, JS, images).
 * Also handles the /api/contact POST endpoint.
 */

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

/**
 * Handle the /api/contact POST route.
 * Mirrors the original Next.js route handler logic.
 */
async function handleContactAPI(req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = JSON.parse(Buffer.concat(chunks).toString());

    const { name, email, phone, message, type } = body;

    if (!name || !email || !message) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Пожалуйста, заполните все обязательные поля' }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Неверный формат электронной почты' }));
      return;
    }

    const RECIPIENT_EMAIL = 'ivanivanit64@gmail.com';
    const typeLabel = type === 'question' ? 'Вопрос по сайту' : 'Информация о ТГК-1';

    const emailContent = [
      'Новое сообщение с сайта ТГК-1',
      '',
      `Тема: ${typeLabel}`,
      `Имя: ${name}`,
      `Почта: ${email}`,
      `Телефон: ${phone || 'Не указан'}`,
      '',
      'Сообщение:',
      message,
      '',
      '---',
      `Отправлено: ${new Date().toLocaleString('ru-RU')}`,
    ].join('\n');

    // Log to server console. The message is destined for: ivanivanit64@gmail.com
    // To enable real email delivery, integrate with an SMTP service
    // (e.g. Nodemailer + Gmail App Password, Resend, SendGrid).
    process.stdout.write(`\n--- Новое сообщение (для ${RECIPIENT_EMAIL}) ---\n${emailContent}\n\n`);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: 'Ваше сообщение успешно отправлено! Я отвечу в ближайшее время.',
    }));
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Произошла ошибка при обработке вашего запроса' }));
  }
}

/**
 * Try reading a file from multiple directories.
 * Checks project root first, then public/ folder.
 */
async function readFileFromPaths(urlPath) {
  const candidates = [
    join(__dirname, urlPath),
    join(__dirname, 'public', urlPath),
  ];

  for (const candidate of candidates) {
    try {
      const data = await readFile(candidate);
      return data;
    } catch {
      // try next candidate
    }
  }
  return null;
}

/**
 * Serve static files from the project root and public/ directory.
 */
async function serveStatic(req, res) {
  let urlPath = new URL(req.url, `http://localhost:${PORT}`).pathname;

  // Default to index.html
  if (urlPath === '/') urlPath = '/index.html';

  const ext = extname(urlPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const data = await readFileFromPaths(urlPath);

  if (data) {
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
    return;
  }

  // If the file isn't found, try serving index.html for clean URLs
  if (ext === '' || ext === '.html') {
    const html = await readFileFromPaths('/index.html');
    if (html) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
}

/**
 * Request router.
 */
const server = createServer((req, res) => {
  if (req.url === '/api/contact') {
    handleContactAPI(req, res);
  } else {
    serveStatic(req, res);
  }
});

server.listen(PORT, () => {
  process.stdout.write(`\nTGK-1 dev server running at http://localhost:${PORT}\n\n`);
});
