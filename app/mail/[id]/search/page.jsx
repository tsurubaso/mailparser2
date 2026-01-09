import { extractKeywordLines } from "@/lib/mail/extractKeywords";

export default async function MailSearchPage({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/mail/${id}`, {
    cache: "no-store",
  });
  const mail = await res.json();

  const keywords = [
    "株式会社",
    "company",
    "電話",
    "phone",
    "住所",
    "adress",
    "〒",
    "アドレス",
    "メール",
    "mail",
    "@",
    "連絡先",
    "円",
    "JPY",
    "携帯",
    "mobile",
  ];
  const matches = extractKeywordLines(mail.body || "", keywords);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      {/* Bouton en haut */}
      <div className="mb-4">
        <a
          href={`http://localhost:3000/mail/${id}`}
          className="inline-block px-4 py-2 border rounded hover:bg-gray-100"
        >
          Mailを確認
        </a>
      </div>
      <h1>Keyword Search</h1>

      {matches.length === 0 && <p>No matches found.</p>}

      {matches.map((match, index) => (
        <div key={index} className="mb-2 p-2 border rounded">
          <strong>{match.keyword}</strong>
          <pre className="whitespace-pre-wrap">{match.line}</pre>
        </div>
      ))}
    </main>
  );
}
