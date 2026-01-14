import { pool } from "@/lib/db";

export async function getMonthlyMails() {
  const result = await pool.query(`
    SELECT
      id,
      subject,
      sender,
      date_received,
      body
    FROM emails_kept
    ORDER BY date_received DESC
  `);

  return result.rows;
}
