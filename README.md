# marp-slides

Marp CLI でスライドを作成・管理するためのリポジトリです。
グローバルに `marp` をインストールしなくても、`npx` 経由で実行できます。

## 使い方

- 新規スライド: `cp slides/templates/deck.md slides/2026/YYYY-MM-DD-topic/slide.md`
- HTML 出力: `make build`
- PDF 出力: `make pdf`
- プレビュー: `make watch SLIDE=slides/2026/2026-02-10-kickoff/slide.md`
- 前提: Node.js / npm が利用できること（`make` は内部で `npx @marp-team/marp-cli@latest` を利用）

## 構成

- `slides/`: 発表ごとの Markdown
- `themes/`: 共通テーマ
- `assets/`: 共通画像
- `dist/`: 生成物
