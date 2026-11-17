// server.js — Tarayıcı ile Claude Code CLI arasındaki "boru".
//
// Bu dosyada yapay zeka mantığı YOK. Tek yaptığı:
//   1. Tarayıcıdan gelen mesajı al
//   2. `claude -p` sürecini başlat, mesajı stdin'den ver
//   3. Sürecin stdout'unu (satır satır JSON olaylar) aynen tarayıcıya aktar
// Modelle konuşmak, araçları çalıştırmak, sohbeti diske kaydetmek gibi işlerin
// hepsini harness (Claude Code) yapıyor.

import http from 'node:http';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;

// Claude bu klasörde çalışır (cwd). Dosya okuma/yazma buraya göre yapılır.
const WORKSPACE = path.join(HERE, 'workspace');

// Modelin görebileceği araçlar. Listeyi harness'e biz veriyoruz; model
// listede olmayan bir aracı çağıramaz. Denemek için Bash ekleyebilirsin.
const TOOLS = process.env.CLAUDE_TOOLS || 'Read,Write,Edit,Glob,Grep';

// Boşsa Claude Code'un varsayılan modeli kullanılır. Örn: CLAUDE_MODEL=haiku
const MODEL = process.env.CLAUDE_MODEL || '';

// Bu sunucuya ulaşabilen herkes makinende Claude Code çalıştırabilir.
// O yüzden sadece localhost'tan gelen istekleri kabul ediyoruz.
const ALLOWED_HOSTS = (process.env.ALLOWED_HOSTS || `localhost:${PORT},127.0.0.1:${PORT}`).split(',');

const UUID = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

async function readBody(req) {
  let body = '';
  for await (const chunk of req) body += chunk;
  return body;
}

async function handleChat(req, res) {
  // JSON şartı: başka bir sitenin, tarayıcın üzerinden buraya gizlice
  // istek atmasını (CSRF) engeller.
  if (!String(req.headers['content-type']).startsWith('application/json')) {
    return sendJson(res, 415, { error: 'Content-Type application/json olmalı' });
  }

  let message, sessionId;
  try {
    ({ message, sessionId } = JSON.parse(await readBody(req)));
  } catch {
    return sendJson(res, 400, { error: 'Geçersiz JSON' });
  }
  if (typeof message !== 'string' || !message.trim()) {
    return sendJson(res, 400, { error: 'message boş olamaz' });
  }
  if (sessionId != null && !UUID.test(sessionId)) {
    return sendJson(res, 400, { error: 'Geçersiz sessionId' });
  }

  const args = [
    '-p',                               // etkileşimsiz mod: cevabı yaz ve çık
    '--output-format', 'stream-json',   // her olay ayrı bir JSON satırı
    '--verbose',                        // stream-json için zorunlu
    '--include-partial-messages',       // metni harf harf (delta) gönder
    '--tools', TOOLS,
    '--permission-mode', 'acceptEdits', // workspace içindeki dosya düzenlemelerini sormadan kabul et
  ];
  // Sohbetin hafızası burada: aynı session id ile çağırınca harness
  // diskteki konuşma geçmişini yükler ve kaldığı yerden devam eder.
  if (sessionId) args.push('--resume', sessionId);
  if (MODEL) args.push('--model', MODEL);

  const child = spawn('claude', args, {
    cwd: WORKSPACE,
    shell: process.platform === 'win32', // Windows'ta claude.cmd için gerekli
  });

  // Mesajı argüman olarak değil stdin'den veriyoruz. Böylece "--bir-bayrak"
  // diye başlayan bir mesaj CLI seçeneği sanılamaz.
  child.stdin.on('error', () => {});
  child.stdin.end(message);

  res.writeHead(200, {
    'Content-Type': 'application/x-ndjson; charset=utf-8',
    'Cache-Control': 'no-cache',
  });
  child.stdout.pipe(res, { end: false });

  let stderr = '';
  child.stderr.on('data', (chunk) => (stderr += chunk));

  let finished = false;
  const finish = (errorMessage) => {
    if (finished) return;
    finished = true;
    if (errorMessage) res.write(JSON.stringify({ type: 'server_error', message: errorMessage }) + '\n');
    res.end();
  };
  child.on('error', (err) => finish(`claude başlatılamadı: ${err.message}`));
  child.on('close', (code) => finish(code === 0 ? null : `claude ${code} koduyla çıktı. ${stderr.trim()}`));

  // Kullanıcı sekmeyi kapatırsa süreci de durdur.
  res.on('close', () => child.kill());
}

const server = http.createServer(async (req, res) => {
  if (!ALLOWED_HOSTS.includes('*') && !ALLOWED_HOSTS.includes(req.headers.host)) {
    return sendJson(res, 403, { error: 'Bu sunucu sadece localhost içindir' });
  }
  if (req.method === 'POST' && req.url === '/api/chat') return handleChat(req, res);
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(await readFile(path.join(HERE, 'public', 'index.html')));
  }
  sendJson(res, 404, { error: 'Bulunamadı' });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Hazır: http://localhost:${PORT}`);
});
