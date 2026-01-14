"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Easy Mail Parser
        </h1>

        <p className="text-gray-600 mb-8">
          Automatic collection, analysis and management of emails.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/mails"
            className="flex flex-col items-center justify-center border rounded-lg p-6 hover:bg-gray-100 transition"
          >
            <span className="text-xl font-semibold">Mails</span>
            <span className="text-sm text-gray-500 mt-1">See your emails</span>
          </a>

          <a
            href="/api/mail/scan"
            className="flex flex-col items-center justify-center border rounded-lg p-6 hover:bg-gray-100 transition"
          >
            <span className="text-xl font-semibold">Scan</span>
            <span className="text-sm text-gray-500 mt-1">Get your emails</span>
          </a>

          <a
            href="/api/mail-count"
            className="flex flex-col items-center justify-center border rounded-lg p-6 hover:bg-gray-100 transition"
          >
            <span className="text-xl font-semibold">Stats</span>
            <span className="text-sm text-gray-500 mt-1">Mail count</span>
          </a>

          <button
            onClick={async () => {
              if (!confirm("Vider la table daily ?")) return;

              await fetch("/api/daily/clear", { method: "POST" });
              alert("Table daily vidée");
            }}
            className="px-6 py-3 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Empty Daily Table
          </button>

          <a
            href="/mails/monthly"
            className="flex flex-col items-center justify-center border rounded-lg p-6 hover:bg-gray-100"
          >
            <span className="text-xl font-semibold">Monthly</span>
            <span className="text-sm text-gray-500">Monthly Archived mails

            </span>
          </a>
        </div>

        <footer className="mt-10 text-sm text-gray-400 text-center">
          Mail Analyzer · POP3 · PostgreSQL · Next.js
        </footer>
      </div>
    </main>
  );
}
