import { getMailById } from "@/lib/mail/getMailById";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    console.log("Fetching mail with ID:", params.id);
    const mail = await getMailById(params.id);

    if (!mail) {
      return new Response(
        JSON.stringify({ error: "Mail not found" }),
        { status: 404 }
      );
    }

    return Response.json({
      id: mail.id,
      subject: mail.subject,
      from: mail.from,
      to: mail.to,
      date: mail.date,
      body: mail.body,       // texte
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
