# marp-slides

Marp CLI でスライドを作成・管理するためのリポジトリです。

## セットアップ

- npm: `npm install`
- pnpm: `pnpm install`

## 使い方

- 新規スライド: `cp slides/templates/deck.md slides/2026/YYYY-MM-DD-topic/slide.md`
- HTML 出力: `npm run build`（または `pnpm build`）
- PDF 出力: `npm run pdf`（または `pnpm pdf`）
- Tailwind CSS ビルド: `npm run tailwind:build`（または `pnpm tailwind:build`）
- Tailwind CSS 監視: `npm run tailwind:watch`（または `pnpm tailwind:watch`）
- プレビュー: `npm run watch SLIDE=slides/2026/2026-02-10-kickoff/slide.md`
- HTTP 配信: `npm run serve`（`PORT=8000 npm run serve` で変更可）
- 生成物削除: `npm run clean`

## 構成

- `slides/`: 発表ごとの Markdown
- `themes/`: 共通テーマ
- `assets/`: 共通画像
- `dist/`: 生成物

## Tailwind CSS を使う

Tailwind は CLI で `themes/tailwind.css` をビルドして使います。
`npm run build` / `npm run pdf` / `npm run watch ...` では、事前に自動ビルドされます。

各スライドの frontmatter 直後に以下を追加してください。

`<link rel="stylesheet" href="themes/tailwind.css">`

`marp.config.mjs` で `baseUrl` を設定しているため、PDF 変換時も `themes/...` を解決できます。
`npm run serve` でリポジトリルートを配信して確認してください。

その後、HTML ブロック内で Tailwind のクラスを使えます。

```html
<div class="grid grid-cols-2 gap-6 text-2xl">
  <div class="rounded-xl bg-slate-100 p-6">A</div>
  <div class="rounded-xl bg-slate-200 p-6">B</div>
</div>
```
