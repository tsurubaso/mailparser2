// lib/mail/extractKeywords.js
export function extractKeywordLines(text, keywords = []) {
  const lines = text.split(/\r?\n/);
  const results = [];

  lines.forEach((line) => {
    keywords.forEach((kw) => {
      if (line.includes(kw)) {
        results.push({
          keyword: kw,
          line: line.trim(),
        });
      }
    });
  });

  return results;
}
