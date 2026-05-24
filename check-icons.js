const l = require('lucide-react');
const social = Object.keys(l).filter(k => /instagram|twitter|youtube|facebook|linkedin|tiktok/i.test(k));
console.log('Social icons:', social.join(', '));
const all = Object.keys(l).filter(k => /^[A-Z]/.test(k)).slice(0, 20);
console.log('Sample icons:', all.join(', '));
