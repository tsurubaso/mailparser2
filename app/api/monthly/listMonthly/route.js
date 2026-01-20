import {getMonthlyMails } from "@/lib/mail/getMonthlyMails.js";

export const runtime = "nodejs";

export async function GET() {

  try {
    const mails = await getMonthlyMails();

    return Response.json({
      status: "ok",
      mails,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
