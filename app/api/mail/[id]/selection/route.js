//selection/

import { pool } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req, { params }) {
  const { id } = params;
  const { action } = await req.json();

  if (!["keep", "delete"].includes(action)) {
    return Response.json({ error: "Invalid action" }, { status: 400 });
  }

  if (action === "keep") {
    // 1. lire le mail original
    const { rows } = await pool.query(
      `SELECT subject, sender, recipient, body, date_received
       FROM emails
       WHERE id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return Response.json({ error: "Mail not found" }, { status: 404 });
    }

    const mail = rows[0];

    // 2. dupliquer dans emails_kept
    await pool.query(
      `
      INSERT INTO emails_kept
        (original_mail_id, subject, sender, recipient, body, date_received)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        id,
        mail.subject,
        mail.sender,
        mail.recipient,
        mail.body,
        mail.date_received,
      ]
    );
  }

  if (action === "delete") {
    // delete manuel futur (placeholder)
  }

  return Response.json({ ok: true });
}
