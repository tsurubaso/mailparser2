import { getMailById } from "@/lib/mail/getMailById";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const mail = await getMailById(id);

    if (!mail) {
      return Response.json(
        { error: "Mail not found" },
        { status: 404 }
      );
    }

    return Response.json({
      id: mail.id,
      subject: mail.subject,
      from: mail.sender,
      to: mail.recipient,
      date: mail.date_received,
      body: mail.body
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      { error: err.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
