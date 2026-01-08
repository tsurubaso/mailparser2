// lib/mail/extractKeywords.js
export function extractKeywordLines(text, keywords = [], context = 0) {
  // Split text into lines
  const lines = text.split(/\r?\n/);
  const results = [];

  lines.forEach((line, i) => {
    keywords.forEach((kw) => {
      if (line.includes(kw)) {
        // Extract surrounding lines
        const start = Math.max(0, i - context);
        const end = Math.min(lines.length - 1, i + context);
        results.push({
          keyword: kw,
          line: line.trim(),
          context: lines.slice(start, end + 1).map((l) => l.trim()),
        });
      }
    });
  });

  return results;
}
