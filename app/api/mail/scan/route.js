import { connectPop3 } from "@/lib/mail/pop3";
import { parseEmail } from "@/lib/mail/parser";
import { saveMail } from "@/lib/saveMail";

export const runtime = "nodejs";

export async function GET() {
  let client;

  try {
    client = await connectPop3();

    let processed = 0;

    await new Promise((resolve, reject) => {
      client.on("list", (status, msgcount) => {
        if (!status) return reject(new Error("LIST failed"));

        const MAX_MAILS = 10;
        const toRead = Math.min(msgcount, MAX_MAILS);

        if (toRead === 0) return resolve();

        for (let i = 1; i <= toRead; i++) {
          client.retr(i);
        }
      });

      client.on("retr", async (status, msgnumber, data) => {
        if (!status) {
          processed++;
          return;
        }

        try {
          const raw = Buffer.isBuffer(data)
            ? data
            : Buffer.from(data, "binary");

          const parsed = await parseEmail(raw);
          await saveMail(parsed);

          processed++;
        } catch (err) {
          reject(err);
        }

        if (processed === Math.min(processed, 10)) {
          resolve();
        }
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

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
