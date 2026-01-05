import { simpleParser } from "mailparser";

export async function parseEmail(source) {
  return await simpleParser(source);
}
