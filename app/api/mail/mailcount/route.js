import { connectPop3 } from "@/lib/mail/pop3";

export const runtime = "nodejs";

export async function GET() {
  let client;

  try {
    client = await connectPop3();

    const msgcount = await new Promise((resolve, reject) => {
      client.on("list", (status, count) => {
        if (!status) {
          reject(new Error("LIST failed"));
          return;
        }

        resolve(count);
      });

      client.list();
    });

    client.quit();

    return Response.json({
      status: "ok",
      messageCount: msgcount,
    });

  } catch (err) {
    if (client) client.quit();

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
