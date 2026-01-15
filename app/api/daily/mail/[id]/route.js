import { getMailById } from "@/lib/mail/getMailById";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  const { id } = await params; // ← c’est ça qu’il te manquait

  try {
    console.log("Fetching mail with ID:", id);
    const mail = await getMailById(id);
    if (!mail) {
      return new Response(
        JSON.stringify({ error: "Mail not found" }),
        { status: 404 }
      );
    }

    return Response.json({
      id: mail.id,
      subject: mail.subject,
      from: mail.sender,
      to: mail.recipient,
      date: mail.date_received,
      body: mail.body,       // texte
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
