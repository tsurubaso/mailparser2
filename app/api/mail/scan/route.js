import { connectPop3 } from "@/lib/mail/pop3";
import { parseEmail } from "@/lib/mail/parser";
import { saveMail } from "@/lib/saveMail";

export const runtime = "nodejs";


export async function GET() {
  let client;

  try {
    client = await connectPop3();
    let processed = 0;
    let totalToRead = 0; // 1. Track the total here

await new Promise((resolve, reject) => {
      client.on("list", async (status, msgcount) => {
        if (!status) return reject(new Error("LIST failed"));

        const toRead = Math.min(msgcount, 10);
        console.log(`Processing ${toRead} emails sequentially...`);

        if (toRead === 0) return resolve();

        // Process each email one-by-one
        for (let i = 1; i <= toRead; i++) {
          await new Promise((res) => {
            client.once("retr", async (status, msgnumber, data) => {
              if (status) {
                try {
                  const raw = Buffer.isBuffer(data) ? data : Buffer.from(data, "binary");
                  const parsed = await parseEmail(raw);
                  await saveMail(parsed);
                  processed++;
                } catch (e) {
                  console.error("Parse/Save Error:", e.message);
                }
              }
              res(); // Move to the next email in the 'for' loop
            });
            client.retr(i);
          });
        }
        resolve(); // All emails are finished
      });

      client.list();
    });

    client.quit();

    return Response.json({
      status: "ok",
      saved: processed,
    });

  } catch (err) {
    if (client) client.quit();
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
