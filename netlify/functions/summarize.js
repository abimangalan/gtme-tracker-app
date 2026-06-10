// Netlify serverless function — Node 18+ (native fetch available)
// POST /api/summarize { url } → { title, summary, thumbnail, category, domain }

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';

function detectCategory(url) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    if (host === 'youtube.com' || host === 'youtu.be') return 'youtube';
    if (host === 'linkedin.com') return 'linkedin';
    return 'article';
  } catch {
    return 'article';
  }
}

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
}

function extractYoutubeThumbnail(url) {
  const m = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg` : null;
}

function extractOGData(html) {
  const get = (name) => {
    const m = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'))
      || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${name}["']`, 'i'));
    return m ? m[1] : null;
  };

  const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = get('og:title') || get('twitter:title') || (titleTag ? titleTag[1].trim() : null);
  const description = get('og:description') || get('twitter:description') || get('description');
  const image = get('og:image') || get('twitter:image');

  const bodyText = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 800);

  return { title, description, image, bodyText };
}

async function fetchPageHTML(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LifeOS-Bot/1.0)',
        'Accept': 'text/html,application/xhtml+xml'
      }
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

async function callGemini(prompt, apiKey) {
  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 300, temperature: 0.3 }
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'GEMINI_API_KEY not configured' }) };
  }

  let url;
  try {
    const body = JSON.parse(event.body || '{}');
    url = body.url?.trim();
    if (!url) throw new Error('url is required');
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') throw new Error('Only HTTPS URLs are supported');
    // Block SSRF: reject loopback, link-local, and private addresses
    const host = parsed.hostname.toLowerCase();
    const isPrivate =
      host === 'localhost' ||
      host.startsWith('127.') ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      host.startsWith('169.254.') ||
      host === '::1' ||
      host.endsWith('.local');
    if (isPrivate) throw new Error('URL not allowed');
  } catch (err) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: err.message }) };
  }

  const category = detectCategory(url);
  const domain = extractDomain(url);

  let title = null;
  let description = null;
  let thumbnail = null;
  let bodyText = '';

  if (category === 'youtube') {
    thumbnail = extractYoutubeThumbnail(url);
  }

  // LinkedIn blocks scrapers — skip fetch entirely
  if (category !== 'linkedin') {
    try {
      const html = await fetchPageHTML(url);
      const og = extractOGData(html);
      title = og.title;
      description = og.description;
      thumbnail = thumbnail || og.image;
      bodyText = og.bodyText;
    } catch (err) {
      console.warn('Page fetch failed, using URL-only prompt:', err.message);
    }
  }

  let prompt;
  if (category === 'linkedin') {
    prompt = `This is a LinkedIn URL: ${url}
Based on the URL path, write a 2-3 sentence description of what this LinkedIn content likely covers (profile, post, article, company, etc.).
Return ONLY the summary text, no labels or markdown.`;
  } else if (title || description || bodyText) {
    prompt = `Summarize this web resource in 2-3 concise sentences for a personal knowledge base.
URL: ${url}
Title: ${title || 'Unknown'}
Description: ${description || 'N/A'}
Content excerpt: ${bodyText || 'N/A'}
Return ONLY the summary text. No labels, no markdown.`;
  } else {
    prompt = `Based only on this URL: ${url}
Write a 2-3 sentence description of what this resource likely covers.
Return ONLY the summary text.`;
  }

  let summary = '';
  try {
    summary = await callGemini(prompt, GEMINI_API_KEY);
  } catch (err) {
    console.error('Gemini call failed:', err.message);
    summary = description || 'No summary available.';
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      title: title || url,
      summary,
      thumbnail: thumbnail || null,
      category,
      domain
    })
  };
};
