import { pool } from "./db";

export async function saveMail(mail) {
  const query = `
    INSERT INTO emails 
    (message_id, subject, sender, date_sent, body)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (message_id) DO NOTHING; 
  `;
  // Using "DO NOTHING" prevents errors if the email was already saved.
  // Alternatively, use "DO UPDATE SET ..." if you want to refresh the data.

  const values = [
    mail.messageId || `no-id-${Date.now()}`, // Fallback in case ID is missing
    mail.subject || "(No Subject)",
    mail.from || "Unknown Sender",
    mail.dateSent,
    mail.text,
  ];

  try {
    await pool.query(query, values);
    console.log(`Successfully saved: ${mail.subject}`);
  } catch (err) {
    console.error(`Database error saving mail "${mail.subject}":`, err.message);
    throw err; // Re-throw so the calling function knows it failed
  }
}