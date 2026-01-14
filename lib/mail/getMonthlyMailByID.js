// Dans @/lib/mail/getMonthlyMails
export async function getMailById(id) {
  const result = await pool.query(`
    SELECT id, subject, sender, date_received, body
    FROM emails_kept
    WHERE id = $1
  `, [id]);

  return result.rows[0]; // On ne renvoie qu'un seul objet, pas un tableau
}