import { CourierClient } from "@trycourier/courier";
import { Handler, HandlerResponse } from "@netlify/functions";

const courier = CourierClient({
  authorizationToken: process.env.COURIER_AUTH_TOKEN,
});

const buildResponse = (statusCode: number, body: object): HandlerResponse => ({
  statusCode,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return buildResponse(405, { error: "Method Not Allowed" });
  }

  let params = { userId: "" };
  try {
    params = JSON.parse(event.body);
  } catch {
    return buildResponse(400, { error: "Bad Request" });
  }

  try {
    const response = await courier.send({
      eventId: process.env.COURIER_NOTIFICATION_ID,
      recipientId: params.userId,
      profile: {
        courier: {
          channel: params.userId,
        },
      },
      data: params,
      override: {},
    });

    return buildResponse(201, response);
  } catch (error) {
    console.error(error.response.data);

    return buildResponse(500, { error: "Internal Server Error" });
  }
};

export { handler };
