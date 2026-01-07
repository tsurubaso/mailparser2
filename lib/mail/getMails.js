import { pool } from "../db.js";

export async function getMails(limit = 20) {
  const result = await pool.query(
    `
    SELECT
      id,
      subject,
      sender,
       date_received,
      LEFT(body, 300) AS preview
    FROM emails
    ORDER BY date_received DESC
    LIMIT $1
    `,
    [limit]
  );

  return result.rows;
}


