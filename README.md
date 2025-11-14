# 中油自助最划算公升數 Top20 - PWA 部署說明

## 檔案結構
```
/ (repo root)
│ index.html
│ manifest.json
│ service-worker.js
└── icons/
     icon-192.png
     icon-512.png
```

## 部署步驟 (GitHub Pages)
1. 把上述檔案上傳到 GitHub repository 的 root（或 gh-pages branch）。
2. Settings → Pages → 選擇 main branch / root（或 gh-pages branch）並啟用。
3. 等 GitHub Pages 佈署完成（通常數十秒到一分鐘）。
4. 用 Chrome 開啟你的頁面（https://<你的帳號>.github.io/<repo>/index.html），點選 Chrome 選單 → 「加入主畫面」(Add to home screen)。

## 注意事項
- PWA 需要 HTTPS；GitHub Pages 自動提供 HTTPS。
- 如果 icon 沒出來，確認 icons 檔案確實在 repo 的 icons/ 目錄下，並且 manifest.json 指向正確路徑。
- service-worker.js 為簡易版：它允許安裝與虛擬離線回退，但不是完整離線 PWA 快取策略。若需更進階快取，請告知我會幫你擴充。
