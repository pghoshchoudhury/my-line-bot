import { Hono } from "hono";
import { messagingApi, validateSignature } from "@line/bot-sdk";

type Bindings = { CHANNEL_ACCESS_TOKEN: string; CHANNEL_SECRET: string };
const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/webhook", async (c) => {
  const body = await c.req.text();
  const signature = c.req.header("x-line-signature") ?? "";

  if (!validateSignature(body, c.env.CHANNEL_SECRET, signature)) {
    return c.text("Invalid signature", 401);
  }

  const client = new messagingApi.MessagingApiClient({
    channelAccessToken: c.env.CHANNEL_ACCESS_TOKEN,
  });

  for (const event of JSON.parse(body).events) {
    if (event.type === "message" && event.message.type === "text") {
      await client.replyMessage({
        replyToken: event.replyToken,
        messages: [{ type: "text", text: `You said: ${event.message.text}` }],
      });
    }
  }
  return c.text("OK");
});

export default app;