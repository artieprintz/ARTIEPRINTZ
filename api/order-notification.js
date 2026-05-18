// Vercel Serverless Function — POST /api/order-notification
// Proxies Discord webhook calls so the webhook URL stays server-side.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('[Discord] DISCORD_WEBHOOK_URL env var is missing');
    // Don't block the order — just log the error
    return res.status(200).json({ success: false, reason: 'Webhook not configured' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('[Discord] Webhook error:', response.status, text);
      // Still return 200 so the order flow isn't blocked
      return res.status(200).json({ success: false, reason: text });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Discord] Fetch error:', error.message);
    // Return 200 so the order completes even if Discord is unreachable
    return res.status(200).json({ success: false, reason: error.message });
  }
}
