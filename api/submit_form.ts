import { CourierClient } from "@trycourier/courier";
import { VercelRequest, VercelResponse } from "@vercel/node";

const courier = new CourierClient({
  authorizationToken: process.env.COURIER_AUTH_TOKEN,
});

export default async function submit_form(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.json({ error: "Method Not Allowed " });
  }

  try {
    const courierResponse = await courier.send({
      message: {
        to: {
          user_id: req.body.userId,
        },
        content: {
          version: "2022-01-01",
          elements: [
            { type: "meta", title: req.body.title || "Title" },
            {
              type: "text",
              content: req.body.message || "Message",
              align: "left",
            },
            { type: "action", content: "Go", href: req.body.cta },
          ],
        },
        routing: { method: "single", channels: ["push"] },
      },
    });

    res.statusCode = 201;
    res.json(courierResponse);
  } catch (error) {
    res.statusCode = 500;
    res.json({ error: "Internal Server Error" });
  }
}
