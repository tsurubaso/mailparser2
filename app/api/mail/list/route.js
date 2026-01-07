import { getMails } from "@/lib/mail/getMails.js";

export const runtime = "nodejs";

export async function GET() {
  console.log("POP3 LIST");
  try {
    const mails = await getMails(20);

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
