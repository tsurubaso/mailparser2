/*import { connectPop3 } from "@/lib/mail/pop3";

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
*/

import { connectPop3 } from "@/lib/mail/pop3";
import { parseEmail } from "@/lib/mail/parser";
import { saveMail } from "@/lib/saveMail";

export const runtime = "nodejs";

export async function GET() {
  let client;

  console.log("=== MAIL SCAN START ===");

  try {
    console.log("[1] Connecting to POP3 server...");
    client = await connectPop3();
    console.log("[2] POP3 connected");

    let processed = 0;

    await new Promise((resolve, reject) => {

      client.on("error", (err) => {
        console.error("[POP3 ERROR EVENT]", err);
        reject(err);
      });

      client.on("list", async (status, msgcount) => {
        console.log("[3] LIST received");
        console.log("    status:", status);
        console.log("    msgcount:", msgcount);

        if (!status) {
          console.error("[LIST FAILED]");
          return reject(new Error("LIST failed"));
        }

       const toRead = msgcount; /////////////////////// Math.min(msgcount, 10); prevoir effacement sur le server de tous les mails lus
        console.log(`[4] Will read ${toRead} emails`);

        if (toRead === 0) {
          console.log("[4bis] No emails to read");
          return resolve();
        }

        for (let i = 1; i <= toRead; i++) {
          console.log(`[5] RETR mail #${i}`);

          await new Promise((res) => {
            client.once("retr", async (status, msgnumber, data) => {
              console.log(`[6] RETR callback for #${msgnumber}`);
              console.log("    status:", status);

              if (!status) {
                console.warn(`[6bis] RETR failed for mail #${msgnumber}`);
                return res();
              }

              try {
                console.log("[7] Raw mail received, size:",
                  Buffer.isBuffer(data) ? data.length : data?.length
                );

                const raw = Buffer.isBuffer(data)
                  ? data
                  : Buffer.from(data, "binary");

                console.log("[8] Parsing mail...");
                const parsed = await parseEmail(raw);

                console.log("[9] Parsed mail:");
                console.log("    subject:", parsed.subject);
                console.log("    from:", parsed.from);
                console.log("    dateSent:", parsed.dateSent);

                console.log("[10] Saving mail to DB...");
                await saveMail(parsed);

                processed++;
                console.log(`[11] Mail saved (total processed: ${processed})`);
              } catch (e) {
                console.error("[ERROR] Parse or Save failed");
                console.error(e);
              }

              res();
            });

            client.retr(i);
          });
        }

        console.log("[12] All mails processed");
        resolve();
      });

      console.log("[0] Sending LIST command");
      client.list();
    });

    console.log("[13] Quitting POP3");
    client.quit();

    console.log("=== MAIL SCAN END ===");

    return Response.json({
      status: "ok",
      saved: processed,
    });

  } catch (err) {
    console.error("[FATAL ERROR]", err);

    if (client) {
      console.log("[CLEANUP] Quitting POP3 after error");
      client.quit();
    }

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
