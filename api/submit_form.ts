import { CourierClient } from "@trycourier/courier";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const courier = CourierClient({
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
      eventId: process.env.COURIER_NOTIFICATION_ID,
      recipientId: req.body.userId,
      profile: {
        courier: {
          channel: req.body.userId,
        },
      },
      data: req.body,
      override: {},
    });

    res.statusCode = 201;
    res.json(courierResponse);
  } catch (error) {
    res.statusCode = 500;
    res.json({ error: "Internal Server Error" });
  }
}
