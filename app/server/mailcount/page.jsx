async function fetchMailCount() {
  const res = await fetch("http://localhost:3000/api/server/mailcount", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch mail count");
  }

  return res.json();
}

export default async function MailCountPage() {
  const data = await fetchMailCount();

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Mail Count
        </h1>

        <p className="text-gray-600 mb-6">
          Total number of emails available on the POP3 server
        </p>

        <div className="text-5xl font-extrabold text-blue-600 mb-6">
          {data.messageCount}
        </div>

        <a
          href="/"
          className="inline-block px-6 py-3 rounded-md border hover:bg-gray-100 transition"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
