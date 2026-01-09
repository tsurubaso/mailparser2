async function fetchMails() {
  const res = await fetch("http://localhost:3000/api/mail/list", {
    cache: "no-store",
  });

  return res.json();
}

export default async function MailsPage() {
  const data = await fetchMails();

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Inbox</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.mails.map((mail) => (
          <a
            key={mail.id}
            href={`/mail/${mail.id}/search`}
            className="block p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">{mail.subject || "(No Subject)"}</h2>
            <p className="text-sm text-gray-600">From: {mail.sender}</p>
            <p className="text-sm text-gray-500">{new Date(mail.received_at).toLocaleString()}</p>
            <p className="mt-2 text-gray-700 text-sm line-clamp-3">{mail.preview}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
