import axios, { AxiosRequestConfig } from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function submit_form(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.json({ error: "Method Not Allowed " });
  }

  const axiosHeaders = {
    Authorization: `Bearer ${
      req.body.apiKey ?? process.env.COURIER_AUTH_TOKEN
    }`,
    "Content-Type": "application/json",
  };

  const axiosRequestConfig: AxiosRequestConfig = {
    headers: axiosHeaders,
    method: "POST",
    url: `${req.body.backendApiUrl ?? "https://api.courier.com"}/send`,
  };

  try {
    const response = await axios.request({
      ...axiosRequestConfig,
      data: {
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
          routing: { method: "single", channels: ["inbox"] },
        },
      },
    });

    res.statusCode = 201;
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    res.statusCode = 500;
    res.json({ error: "Internal Server Error" });
  }
}
