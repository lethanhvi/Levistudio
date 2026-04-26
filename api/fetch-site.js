export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL' });

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SpaAnalyzer/1.0)',
        'Accept': 'text/html,application/xhtml+xml,*/*'
      },
      signal: AbortSignal.timeout(10000)
    });
    
    const html = await response.text();
    res.status(200).json({ html, status: response.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
