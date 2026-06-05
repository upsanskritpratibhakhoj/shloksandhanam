import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the complete database module dynamically,
// or just read its JSON content since it was generated
const getShlokas = () => {
  const jsonPath = path.join(__dirname, '../data/shlokaDatabase.json');
  if (fs.existsSync(jsonPath)) {
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const db = JSON.parse(rawData);
    // Return just the shloka texts
    return db.map(entry => entry.text);
  }
  return [];
};

const SITE_URL = 'https://shloksandhanam.com'; // Replace with actual domain

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

  const maxUrls = 50000; // Sitemap limit
  const limit = Math.min(shlokas.length, maxUrls - 1);
  
  for (let i = 0; i < limit; i++) {
    const shloka = shlokas[i];
    // Create a URL-friendly slug based on the first line
    const firstLine = shloka.split('\\n')[0].trim();
    const shortShloka = firstLine.split(' ').slice(0, 5).join('-');
    const safeUrlSlug = shortShloka.replace(/[^\w\s\u0900-\u097F-]/g, '');
    
    // We add an index to ensure absolute uniqueness if chunks match
    xml += `
  <url>
    <loc>${SITE_URL}/shloka/${encodeURIComponent(safeUrlSlug)}?id=${i}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  xml += '\n</urlset>';
  
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
  console.log(`✅ Generated sitemap.xml with ${limit + 1} URLs`);
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

## Available Shlokas Database (${shlokas.length} entries)

The database maps Shloka text to the next character (for Antakshari). Examples:
`;

  for (let i = 0; i < shlokas.length; i++) {
    const shloka = shlokas[i];
    // Add the complete shloka text
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
console.log(`Found ${shlokas.length} total shlokas for SEO generation`);

if (shlokas.length > 0) {
  generateSitemap(shlokas);
  generateRobotsTxt();
  generateLlmsTxt(shlokas);
  console.log('🚀 All SEO assets generated successfully!');
} else {
  console.log('❌ No shlokas found. Did you run the extraction script first?');
}
