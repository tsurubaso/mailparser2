// Dans @/lib/mail/getMonthlyMails

import { pool } from "../db.js";

export async function getMailById(id) {
  const result = await pool.query(`
    SELECT id, subject, sender, date_received, body
    FROM mail_selected
    WHERE id = $1
  `, [id]);

  return result.rows[0]; // On ne renvoie qu'un seul objet, pas un tableau
}