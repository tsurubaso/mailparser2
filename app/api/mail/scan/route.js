import { connectPop3 } from "@/lib/mail/pop3";
import { parseEmail } from "@/lib/mail/parser";

export const runtime = "nodejs";

export async function GET() {
  let client;

  try {
    client = await connectPop3();

    const messages = [];
    let toRead = 0;
    let done = 0;

    await new Promise((resolve, reject) => {
      client.on("list", (status, msgcount) => {
        if (!status) return reject(new Error("LIST failed"));

        const MAX_MAILS = 10;
        toRead = Math.min(msgcount, MAX_MAILS);
        if (toRead === 0) return resolve();

        for (let i = 1; i <= toRead; i++) {
          client.retr(i);
        }
      });

      client.on("retr", async (status, msgnumber, data) => {
        if (status) {
          const raw = Buffer.isBuffer(data)
            ? data
            : Buffer.from(data, "binary");

          const parsed = await parseEmail(raw);

          messages.push({
            index: msgnumber,
            subject: parsed.subject,
            from: parsed.from?.text,
            date: parsed.date,
            text: parsed.text,
          });
        }

        done++;
        if (done === toRead) resolve();
      });

      client.list();
    });

    client.quit();
    return Response.json({ messages });

  } catch (err) {
    if (client) client.quit();
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
