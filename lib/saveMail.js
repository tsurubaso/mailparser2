import { pool } from "./db";

export async function saveMail(mail) {



  const query = `
    INSERT INTO emails
    (message_id, subject, sender, date_sent, body)
    VALUES ($1, $2, $3, $4, $5)
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
