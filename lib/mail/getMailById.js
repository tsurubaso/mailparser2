// lib/mail/getMailById.js
import { pool } from "../db.js";

export async function getMailById(id) {
  const result = await pool.query(
    `
    SELECT
      id,
      subject,
      sender AS from,
      recipient AS to,
      date_received AS date,
      body,
      html_body AS "htmlBody"
    FROM emails
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}
era