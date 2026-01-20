import { connectPop3 } from "@/lib/pop3";

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
        console.log("Message count:", count);
        resolve(count);
      });

      client.list();
    });

    client.quit();

    return Response.json({
      messageCount: msgcount,
      status: msgcount > 0 ? "OK" : "EMPTY",
    });
  } catch (err) {
    if (client) client.quit();
   return new Response(
      JSON.stringify({
        status: "ERROR",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}
