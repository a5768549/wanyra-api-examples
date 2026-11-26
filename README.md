# Wanyra API Examples (万钥 / Star1Age Unified Multimodal AI API)

Official starter examples for **[Wanyra API](https://api.star1age.cn)** (`https://api.star1age.cn/v1`) — an OpenAI-compatible unified multimodal AI gateway built by **[Star1Age](https://star1age.cn)**, powering **[Davro Desktop](https://davro.app)**, **[Davro Cloud](https://cloud.star1age.cn)**, **[Toonra Canvas](https://canvas.star1age.cn)**, and **[Zuolo Workflow](https://workflow.star1age.cn)**.

One API key and one non-expiring pay-as-you-go credit wallet (`CNY 1 = 1,000 exact integer points`, no monthly subscription) gives access to **80+ live GA models** across Anthropic Claude, OpenAI GPT, Google Gemini, DeepSeek, Alibaba Qwen, xAI Grok, Kling, Vidu, Wan, Seedance, MiniMax H3, and HappyHorse.

## Quick Links

- **Live Price Sheet & Model Catalog**: https://api.star1age.cn/en (also [简体中文](https://api.star1age.cn/zh-CN) / [繁體中文](https://api.star1age.cn/zh-TW) / [日本語](https://api.star1age.cn/ja) / [한국어](https://api.star1age.cn/ko))
- **Developer Docs**: https://api.star1age.cn/en/docs
- **OpenAPI 3.1 Spec**: https://api.star1age.cn/v1/openapi.json
- **Live JSON Catalog**: https://api.star1age.cn/api/portal/public-api/catalog
- **Machine-Readable Summary (`llms.txt`)**: https://api.star1age.cn/llms.txt

## Examples Included

| Example | Language | Demonstrates |
|---|---|---|
| [`examples/chat_stream.mjs`](examples/chat_stream.mjs) | Node.js (Zero-dep / OpenAI-compatible) | Streaming chat completions with `stream_options.include_usage: true` |
| [`examples/chat_openai.py`](examples/chat_openai.py) | Python (`openai` SDK) | Drop-in OpenAI SDK client pointing at `https://api.star1age.cn/v1` |
| [`examples/video_async.mjs`](examples/video_async.mjs) | Node.js | `POST /v1/videos` (`multipart/form-data`), `Idempotency-Key`, and HTTP 202 + `GET /v1/requests/:id` polling |
| [`examples/list_catalog.mjs`](examples/list_catalog.mjs) | Node.js | Inspecting live GA models and exact integer-point pricing without authentication |

## Getting Started

1. Sign in at **[Wanyra Console](https://api.star1age.cn/en/console/api-keys)** (uses your unified [Star1Age Account](https://account.star1age.cn)) and create an API key.
2. Export your key:
   ```bash
   export STAR1AGE_API_KEY="sk-..."
   ```
3. Run any example:
   ```bash
   node examples/list_catalog.mjs
   node examples/chat_stream.mjs
   ```

## Star1Age Product Ecosystem

- **[Star1Age](https://star1age.cn)** — AI content production studio & AI product company ([Production Guides](https://star1age.cn/en/guides))
- **[Davro Desktop](https://davro.app/en/agent)** — Multi-model Windows AI agent for local files, code, AI comics & short dramas
- **[Davro Cloud](https://cloud.star1age.cn/en)** — Browser & Android multi-model workspace with background tasks & AI digital employees
- **[Toonra / 剧格](https://canvas.star1age.cn/)** — Node-based AI animated drama & storyboard canvas
- **[Zuolo / 做咯](https://workflow.star1age.cn/)** — One-click AI talking-head, subject swap & lip-sync video workflows
- **[Wanyra / 万钥 API](https://api.star1age.cn/en)** — OpenAI-compatible multimodal AI gateway

## License

MIT
