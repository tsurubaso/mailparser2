import { extractKeywordLines } from "@/lib/mail/extractKeywords";

export default async function MailSearchPage({ params }) {
  const { id } = params;

  // Fetch the mail
  const res = await fetch(`http://localhost:3000/api/mail/${id}`, {
    cache: "no-store",
  });
  const mail = await res.json();

  // Define keywords
  const keywords = ["株式会社", "電話", "電話番号"];

  // Extract lines with 1 line context before/after
  const matches = extractKeywordLines(mail.body || "", keywords, 1);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1>Keyword Search in Mail #{id}</h1>
      {matches.length === 0 && <p>No matches found.</p>}

      {matches.map((match, index) => (
        <div key={index} className="mb-4 p-2 border rounded">
          <p>
            <strong>Keyword:</strong> {match.keyword}
          </p>
          <pre className="whitespace-pre-wrap">
            {match.context.join("\n")}
          </pre>
        </div>
      ))}
    </main>
  );
}
