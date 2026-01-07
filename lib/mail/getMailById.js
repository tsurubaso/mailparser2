// lib/mail/getMailById.js
import { pool } from "../db.js";

export async function getMailById(id) {
  const result = await pool.query(
    `
    SELECT
      id,
      subject,
      sender,
      recipient,
      date_received,
      body
    FROM emails
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null; // retourne null si aucun mail trouvé
}
