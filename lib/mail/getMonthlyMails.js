import { pool } from "../db.js";

export async function getMonthlyMails() {
  const result = await pool.query(`
    SELECT
      id,
      subject,
      sender,
      date_received,
      body
    FROM mail_monthly
    ORDER BY date_received DESC
  `);

  return result.rows;
}
