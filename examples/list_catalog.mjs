#!/usr/bin/env node
/** Inspect live public Wanyra GA model catalog (no API key required). */
const res = await fetch('https://api.star1age.cn/api/portal/public-api/catalog');
if (!res.ok) throw new Error(`Catalog HTTP ${res.status}`);
const data = await res.json();
const ga = (data.models || []).filter((m) => m.status === 'ga' && !/internal/i.test(m.displayName || ''));

const byEndpoint = {};
for (const m of ga) byEndpoint[m.endpoint] = (byEndpoint[m.endpoint] || 0) + 1;

console.log(`Wanyra Live GA Models: ${ga.length}`);
console.log('Breakdown:', byEndpoint);
console.log('Sample models:');
for (const m of ga.slice(0, 12)) {
  console.log(`  [${m.endpoint}] ${m.id} — ${m.displayName || m.id}`);
}
