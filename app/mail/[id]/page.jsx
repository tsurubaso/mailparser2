export default async function MailPage({ params }) {
  const { id } = await params; // ← c’est ça qu’il te manquait
  console.log("Mail ID:", id);

  const res = await fetch(`http://localhost:3000/api/mail/${id}`, {
    cache: "no-store",
  });
  console.log("Fetch res:", res.ok, res.status);

  const mail = await res.json();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1>{mail.subject}</h1>
      <p>From: {mail.from}</p>
      <p>To: {mail.to}</p>
      <p>Date: {mail.date}</p>
      <hr />
      {mail.body && <pre className="whitespace-pre-wrap">{mail.body}</pre>}
    </main>
  );
}
