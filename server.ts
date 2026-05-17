import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();

  app.use(express.json());

  const PORT = 3000;

  // Discord Webhook API
  app.post('/api/order-notification', async (req, res) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    console.log('Incoming Order:', req.body);
    console.log('Webhook URL:', webhookUrl);

    if (!webhookUrl) {
      console.warn('Discord webhook URL not configured');

      return res.status(500).json({
        success: false,
        message: 'Webhook not configured',
      });
    }

    try {
      const {
        name,
        phone,
        product,
        address,
        quantity,
        price,
      } = req.body;

      const discordMessage = {
        content: `
🛒 **New Order Received**

👤 Name: ${name || 'N/A'}
📞 Phone: ${phone || 'N/A'}
📦 Product: ${product || 'N/A'}
🔢 Quantity: ${quantity || 'N/A'}
💰 Price: ${price || 'N/A'}
📍 Address: ${address || 'N/A'}
        `,
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage),
      });

      const responseText = await response.text();

      console.log('Discord Response:', responseText);

      if (response.ok) {
        return res.json({
          success: true,
          message: 'Notification sent to Discord',
        });
      } else {
        return res.status(500).json({
          success: false,
          error: responseText,
        });
      }
    } catch (error) {
      console.error('Discord Webhook Error:', error);

      return res.status(500).json({
        success: false,
        error: 'Internal Server Error',
      });
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