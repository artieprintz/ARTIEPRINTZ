import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();

  app.use(express.json());

  const PORT = 3000;

  // Discord Webhook API — proxies embed payloads to Discord
  app.post('/api/order-notification', async (req, res) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('[Discord] DISCORD_WEBHOOK_URL not configured');
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
        return res.status(200).json({ success: false, reason: text });
      }

      return res.json({ success: true });
    } catch (error) {
      console.error('[Discord] Error:', error);
      return res.status(200).json({ success: false, reason: 'Internal error' });
    }
  });

  // Vite Development Server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production Build
    const distPath = path.join(process.cwd(), 'dist');

    app.use(express.static(distPath));

    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

startServer();