import { simpleParser } from "mailparser";

export async function parseEmail(raw) {
  const parsed = await simpleParser(raw);

  console.log("==== MAIL PARSÉ ====");
  console.log(parsed.text);
  console.log("===================");

  return {
    subject: parsed.subject,
    from: parsed.from,
    to: parsed.to,
    date: parsed.date,
    text: parsed.text,        // ← TEXTE DÉCODÉ
    html: parsed.html,        // ← HTML si présent
    charset: parsed.charset,
  };
}
