// lib/mail/getMailById.js
import { pool } from "../db.js";

export async function getMailById(id) {
  const result = await pool.query(
    `
    SELECT
      id,
      subject,
      sender,
      date_received,
      body
    FROM mail_daily
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null; // retourne null si aucun mail trouvé
}
