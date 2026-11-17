# Claude Chat

Tarayıcıdaki bir chat penceresinden yazdığın mesajı Claude Code'a gönderen,
cevabı canlı olarak geri gösteren küçük bir öğrenme projesi. Bağımlılık yok:
bir `server.js`, bir `index.html`.

## Çalıştırma

Gerekenler: Node 18+ ve giriş yapılmış Claude Code (terminalde `claude`
yazınca açılıyorsa tamam).

```bash
node server.js
```

Sonra http://localhost:3000 adresini aç.

Ayarlar ortam değişkeniyle verilir:

| Değişken | Varsayılan | Ne işe yarar |
|---|---|---|
| `PORT` | `3000` | Sunucunun portu |
| `CLAUDE_MODEL` | Claude Code'un varsayılanı | Örn. `haiku` (denemeler için ucuz ve hızlı) |
| `CLAUDE_TOOLS` | `Read,Write,Edit,Glob,Grep` | Modelin kullanabileceği araçlar |

## Nasıl çalışıyor

```
Tarayıcı ──POST /api/chat──▶ server.js ──başlatır──▶ claude -p ──▶ Claude modeli
    ▲                            │                      │  ▲
    └──── JSON olay akışı ───────┘◀────── stdout ───────┘  └─ araçlar (Read, Write…)
```

Her mesajda sunucu şu komutu çalıştırır ve mesajı stdin'den verir:

```bash
claude -p --output-format stream-json --verbose --include-partial-messages \
       --tools Read,Write,Edit,Glob,Grep --permission-mode acceptEdits \
       --resume <session-id>     # ilk mesajda yok
```

- `-p`: etkileşimsiz mod. Cevabı yazar ve çıkar.
- `--output-format stream-json`: olan her şeyi satır satır JSON olarak yazar.
  Sunucu bu satırları hiç değiştirmeden tarayıcıya aktarır.
- `--resume <id>`: sohbetin hafızası. Her mesaj yeni bir süreçtir; süreç
  kapanınca bellekte hiçbir şey kalmaz. Harness konuşmayı diske yazar
  (`~/.claude/projects/<klasör>/<session-id>.jsonl`) ve aynı id ile
  çağrılınca oradan yükler. Tarayıcı sadece bu id'yi tutar.

## Harness bu projede nerede?

Model tek başına sadece metin üretir; dosya okuyamaz, komut çalıştıramaz.
"Şu dosyayı okumak istiyorum" diyebilir, o kadar. Harness, modelin etrafındaki
programdır: isteği modele yollar, modelin istediği aracı gerçekten çalıştırır,
sonucu modele geri verir ve model "bitti" diyene kadar bu döngüyü sürdürür.
İzinleri ve sohbet kaydını da o yönetir.

Burada harness Claude Code'un kendisi. `server.js` ve `index.html` onun
üstüne konmuş ince bir arayüz. Sağdaki "Harness olay akışı" paneli döngüyü
adım adım gösterir.

## Denemeler

1. **Döngüyü izle.** "Bu klasörde ne var?" diye sor. Sağ panelde sırayla
   `assistant · tool_use`, `user · tool_result`, sonra `assistant · text`
   göreceksin. Satırlara tıklayıp ham JSON'a bak.
2. **Dosya yazdır.** "merhaba.txt diye bir dosya oluştur" de, sonra
   `workspace/` klasörüne bak.
3. **Aynı sohbete terminalden devam et.** Üstteki session id'yi kopyala:
   ```bash
   cd workspace
   claude --resume <session-id>
   ```
   Web'de konuştuklarını terminaldeki Claude hatırlıyor olacak.
4. **Araç listesini değiştir.** `CLAUDE_TOOLS=Read node server.js` ile başlat
   ve dosya yazmasını iste. `system / init` olayındaki araç listesine ve
   modelin ne cevap verdiğine bak.
5. **İzinleri kurcala.** `CLAUDE_TOOLS=Read,Bash` ile başlat ve bir komut
   çalıştırmasını iste. Çalışıp çalışmayacağı Claude Code izin ayarlarına
   bağlı; reddedilen çağrılar `result` olayının `permission_denials` alanında
   görünür.

## Dikkat

- Sunucu sadece `127.0.0.1` üzerinde dinler. Dışarı açma: bu adrese ulaşan
  herkes senin makinende Claude Code çalıştırabilir.
- Her mesaj Claude Code kullanımından düşer. `result` olayındaki
  `total_cost_usd` o turun karşılığını gösterir.
- `workspace/` bir sandbox değil, sadece çalışma klasörü. Claude'un başka
  yerlere erişimi Claude Code izin ayarlarına bağlıdır.

## Sonraki adımlar

- **Agent SDK.** `spawn('claude', …)` yerine `@anthropic-ai/claude-agent-sdk`
  paketindeki `query()` fonksiyonunu kullan. Aynı harness, ama süreç ve JSON
  ayrıştırma işini kütüphane yapar.
  https://code.claude.com/docs/en/agent-sdk/overview
- **Tek süreç, çok mesaj.** `--input-format stream-json` ile süreci açık tut
  ve mesajları stdin'den JSON olarak gönder. Her mesajda yeniden başlatma
  maliyeti kalkar.
- **Kendi harness'ini yaz.** Claude Code'u aradan çıkar, Messages API'ye
  doğrudan bağlan ve döngüyü kendin kur: modele sor, araç istediyse çalıştır,
  sonucu geri ver, bitene kadar tekrarla. Harness mantığını en iyi bu öğretir.

CLI seçeneklerinin tamamı: https://code.claude.com/docs/en/headless
