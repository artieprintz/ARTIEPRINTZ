export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const webhook = process.env.DISCORD_WEBHOOK_URL;

    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}