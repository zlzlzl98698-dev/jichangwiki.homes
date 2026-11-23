// scripts/generate_favicon.js
import fs from 'node:fs';

const avatarBuffer = fs.readFileSync('public/images/avatar.webp');
const base64 = avatarBuffer.toString('base64');

// Create embedded SVG favicon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128">
  <defs>
    <clipPath id="avatar-clip">
      <rect width="128" height="128" rx="28" ry="28" />
    </clipPath>
  </defs>
  <rect width="128" height="128" rx="28" ry="28" fill="#1e293b" />
  <image width="128" height="128" clip-path="url(#avatar-clip)" preserveAspectRatio="xMidYMid slice" href="data:image/webp;base64,${base64}" />
</svg>`;

fs.writeFileSync('public/favicon.svg', svgContent, 'utf8');
fs.writeFileSync('public/favicon.ico', avatarBuffer); // Direct fallback for browsers requesting /favicon.ico
console.log('Successfully generated public/favicon.svg and public/favicon.ico!');
