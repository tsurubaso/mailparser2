import { simpleParser } from "mailparser";

export async function parseEmail(raw) {
  const parsed = await simpleParser(raw);

  console.log("==== MAIL PARSÉ ====");
  console.log("Message Id :", parsed.messageId);
  //console.log("Message Text :", parsed.text);
  console.log("===================");

  return {
    messageId: parsed.messageId || null,
    subject: parsed.subject || null,
    from: parsed.from?.text || null,
    to: parsed.to?.text || null,
    text: parsed.text || null, // ← TEXTE DÉCODÉ
   // html: parsed.html || null, // ← HTML si présent
    dateSent: parsed.date instanceof Date ? parsed.date : null,
    charset: parsed.charset || null,
  };
}
