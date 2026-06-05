import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get SEO data
const getShlokas = () => {
  const content = fs.readFileSync(path.join(__dirname, '../data/shlokaAudioDatabase.ts'), 'utf8');
  
  // Use a global regex to extract all keys from the dictionary
  const regex = /"([^"]+)":\s*"[^"]+"/g;
  const shlokas = [];
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    if (match[1]) {
      shlokas.push(match[1]);
    }
  }
  
  return shlokas;
};

const SITE_URL = 'https://shloksandhanam.com'; // Replace with your actual domain

// 1. Generate Sitemap
const generateSitemap = (shlokas) => {
  const date = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  for (const shloka of shlokas) {
    // Keep it relatively short for URL if it's too long
    const shortShloka = shloka.split(' ').slice(0, 8).join('-').replace(/[^\w\s\u0900-\u097F-]/g, '');
    xml += `
  <url>
    <loc>${SITE_URL}/shloka/${encodeURIComponent(shortShloka)}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  xml += '\n</urlset>';
  
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
  console.log('✅ Generated sitemap.xml');
};

// 2. Generate robots.txt
const generateRobotsTxt = () => {
  const txt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;
  
  fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), txt);
  console.log('✅ Generated robots.txt');
};

// 3. Generate llms.txt (for AI crawlers/LLMs)
const generateLlmsTxt = (shlokas) => {
  let txt = `# ShlokSandhanam - Sanskrit Shlokas Database
This website provides a searchable database of Sanskrit Shlokas along with audio pronunciation.

## Available Shlokas:
`;

  for (const shloka of shlokas) {
    txt += `- ${shloka}\n`;
  }
  
  fs.writeFileSync(path.join(__dirname, '../public/llms.txt'), txt);
  console.log('✅ Generated llms.txt');
};

// Run generators
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const shlokas = getShlokas();
console.log(`Found ${shlokas.length} shlokas for SEO generation`);

generateSitemap(shlokas);
generateRobotsTxt();
generateLlmsTxt(shlokas);

console.log('🚀 All SEO assets generated successfully!');
