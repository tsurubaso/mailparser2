"use client";

import { useEffect, useMemo, useState } from "react";
import FilterByKeywords from "@/components/FilterByKeywords";
import keywords from "@/data/keywordslist.json";

export default function MailsPage() {
  const [mails, setMails] = useState([]);
  const [activeKeywords, setActiveKeywords] = useState([]);

  useEffect(() => {
    async function fetchMails() {
      const res = await fetch(
        "http://localhost:3000/api/daily/mails/list",
        { cache: "no-store" }
      );
      const data = await res.json();
      setMails(data.mails);
    }

    fetchMails();
  }, []);

  const filteredMails = useMemo(() => {
    if (activeKeywords.length === 0) return mails;

    const activeRegexes = keywords
      .filter((k) => activeKeywords.includes(k.name))
      .map((k) => new RegExp(k.pattern, k.flags));

    return mails.filter((mail) => {
      const content = [
        mail.subject,
        mail.preview,
        mail.body
      ].join(" ");

      return activeRegexes.some((re) => re.test(content));
    });
  }, [activeKeywords, mails]);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Daily Inbox</h1>

      <FilterByKeywords onChange={setActiveKeywords} />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredMails.map((mail) => (
          <a
            key={mail.id}
            href={`/daily/keywords/${mail.id}`}
            className="block p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">
              {mail.subject || "(No Subject)"}
            </h2>
            <p className="text-sm text-gray-600">From: {mail.sender}</p>
            <p className="text-sm text-gray-500">
              {new Date(mail.date_received).toLocaleString()}
            </p>
            <p className="mt-2 text-gray-700 text-sm line-clamp-3">
              {mail.preview}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
