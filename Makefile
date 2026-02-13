.PHONY: help build pdf watch serve clean

SLIDES := $(shell find slides -name 'slide.md')
MARP := npx marp
SLIDE ?=
PORT ?= 8000

help:
	@echo "make build  # 全スライドを HTML 出力"
	@echo "make pdf    # 全スライドを PDF 出力"
	@echo "make watch SLIDE=slides/2026/2026-02-10-kickoff/slide.md  # 単一スライドをプレビュー"
	@echo "make serve [PORT=8000]  # ルートを HTTP 配信"
	@echo "make clean  # 生成物を削除"

build:
	$(MARP) --config marp.config.mjs $(SLIDES) --html --output dist/

pdf:
	$(MARP) --config marp.config.mjs $(SLIDES) --pdf --output dist/

watch:
	@test -n "$(SLIDE)" || (echo "SLIDE を指定してください: make watch SLIDE=slides/2026/2026-02-10-kickoff/slide.md" && exit 1)
	@mkdir -p dist
	$(MARP) --config marp.config.mjs --watch --output dist/$(notdir $(basename $(SLIDE))).html $(SLIDE)

serve:
	python3 -m http.server $(PORT)

clean:
	rm -rf dist/*
