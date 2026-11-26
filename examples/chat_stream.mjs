#!/usr/bin/env node
/**
 * Streaming chat completion against Wanyra API (https://api.star1age.cn/v1)
 * using zero external dependencies.
 */
const API_KEY = process.env.STAR1AGE_API_KEY;
if (!API_KEY) {
  console.error('Set STAR1AGE_API_KEY before running.');
  process.exit(1);
}

const MODEL = process.env.WANYRA_MODEL || 'star1age-deepseek-v4.1-flash';

const res = await fetch('https://api.star1age.cn/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: MODEL,
    stream: true,
    stream_options: { include_usage: true },
    messages: [
      { role: 'user', content: 'Summarize pay-as-you-go multimodal AI APIs in two sentences.' },
    ],
  }),
});

if (!res.ok) {
  console.error(`HTTP ${res.status}:`, await res.text());
  process.exit(1);
}

const decoder = new TextDecoder();
let buf = '';
for await (const chunk of res.body) {
  buf += decoder.decode(chunk, { stream: true });
  for (const line of buf.split('\n')) {
    if (!line.startsWith('data: ')) continue;
    const data = line.slice(6).trim();
    if (data === '[DONE]') {
      process.stdout.write('\n');
      continue;
    }
    try {
      const evt = JSON.parse(data);
      const text = evt.choices?.[0]?.delta?.content;
      if (text) process.stdout.write(text);
      if (evt.usage) console.error('\nUsage:', JSON.stringify(evt.usage));
    } catch {}
  }
  buf = buf.slice(buf.lastIndexOf('\n') + 1);
}
