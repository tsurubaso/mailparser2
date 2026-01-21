async function fetchMailImportResult() {
  const res = await fetch(`/api/server/mailcount`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch mail import result");
  }

  return res.json();
}

export default async function MailImportResultPage() {
  const data = await fetchMailImportResult();

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center space-y-6">
        
        <h1 className="text-2xl font-bold text-gray-900">
          Mail import result
        </h1>

        <p className="text-gray-600">
          POP3 mailbox synchronization completed
        </p>

        <div className="flex flex-col items-center gap-2">
          <div className="text-5xl font-extrabold text-green-600">
            {data.messageCount}
          </div>
          <div className="text-sm text-gray-500">
            emails saved
          </div>
        </div>

        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 text-sm">
          Status: <strong>{data.status}</strong>
        </div>

        <div className="pt-4">
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-md border hover:bg-gray-100 transition"
          >
            Back to Home
          </a>
        </div>

      </div>
    </main>
  );
}
