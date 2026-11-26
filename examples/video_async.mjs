#!/usr/bin/env node
/**
 * Durable async video generation with Idempotency-Key + HTTP 202 polling
 * against Wanyra API (https://api.star1age.cn/v1/videos).
 */
import crypto from 'node:crypto';

const API_KEY = process.env.STAR1AGE_API_KEY;
if (!API_KEY) {
  console.error('Set STAR1AGE_API_KEY before running.');
  process.exit(1);
}

const idempotencyKey = `demo-video-${crypto.randomUUID()}`;
const form = new FormData();
form.append('model', process.env.WANYRA_VIDEO_MODEL || 'star1age-minimax-h3');
form.append('prompt', 'A slow cinematic camera glide over a neon-lit rainy night street, 35mm film grain.');

const submitRes = await fetch('https://api.star1age.cn/v1/videos', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Idempotency-Key': idempotencyKey,
  },
  body: form,
});

const submitted = await submitRes.json();
console.log('Submit status:', submitRes.status, submitted);
const requestId = submitted.request_id || submitted.id;
if (!requestId) process.exit(submitRes.ok ? 0 : 1);

for (let i = 0; i < 60; i++) {
  await new Promise((r) => setTimeout(r, 5000));
  const pollRes = await fetch(`https://api.star1age.cn/v1/requests/${encodeURIComponent(requestId)}`, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
  });
  const state = await pollRes.json();
  console.log(`Poll #${i + 1}:`, state.status);
  if (['succeeded', 'failed', 'cancelled'].includes(state.status)) {
    console.log(JSON.stringify(state, null, 2));
    break;
  }
}
