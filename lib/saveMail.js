import { Pool } from "./db";

export async function saveMail(mail) {
  const query = `
    INSERT INTO emails
    (message_uid, subject, sender, date_sent, body)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (message_uid) DO NOTHING
  `;

  const values = [
    mail.messageId,
    mail.subject,
    mail.from,
    mail.dateSent,
    mail.text,
  ];

  await pool.query(query, values);
}
