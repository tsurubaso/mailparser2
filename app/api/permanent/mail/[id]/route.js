import { getMailById } from "@/lib/mail/getPermanentMailByID";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const mail = await getMailById(id);

    if (!mail) {
      return new Response(JSON.stringify({ error: "Mail non trouvé" }), { status: 404 });
    }

    return Response.json(mail); // Renvoie l'objet mail directement
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
