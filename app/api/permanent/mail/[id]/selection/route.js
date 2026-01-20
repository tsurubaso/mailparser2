//selection/

import { pool } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req, { params }) {
  const { id } = await params;
  const { action } = await req.json();

  if (!["delete"].includes(action)) {
    return Response.json({ error: "Invalid action" }, { status: 400 });
  }

  if (action === "delete") {
       await pool.query(
      "DELETE FROM mail_selected WHERE id = $1",
      [id]
    );
  }

  return Response.json({ ok: true });
}
