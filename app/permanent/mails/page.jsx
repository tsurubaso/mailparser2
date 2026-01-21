async function fetchMails() {
  const res = await fetch(`/api/permanent/mails/list`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch mails");
  }

  return res.json();
}

function groupByMonth(mails) {
  return mails.reduce((acc, mail) => {
    const date = new Date(mail.date_received);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!acc[key]) {
      acc[key] = {
        label: date.toLocaleString("ja-JP", {
          month: "long",
          year: "numeric",
        }),
        mails: [],
      };
    }

    acc[key].mails.push(mail);
    return acc;
  }, {});
}

export default async function MonthlyMailsPage() {
  const data = await fetchMails();
  const grouped = groupByMonth(data.mails);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Permanent Inbox</h1>

      {Object.values(grouped).map(
        (group) =>
          console.log(group.label) || (
            <section key={group.label} className="mb-10">
              {/* Perma header */}
              <div className="mb-4 px-4 py-2 rounded-lg bg-blue-100 text-blue-900 font-semibold capitalize">
                {group.label}
              </div>

              {/* Cards */}
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {group.mails.map((mail) => (
                  <a
                    key={mail.id}
                    href={`/permanent/keywords/${mail.id}`}
                    className="block p-4 border rounded-lg shadow hover:shadow-lg transition bg-white"
                  >
                    <h2 className="font-semibold text-lg">
                      {mail.subject || "(No Subject)"}
                    </h2>

                    <p className="text-sm text-gray-600 mt-1">
                      From: {mail.sender}
                    </p>

                    <p className="text-sm text-gray-500">
                      {new Date(mail.date_received).toLocaleString()}
                    </p>

                    <p className="mt-2 text-gray-700 text-sm line-clamp-3">
                      {mail.preview}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ),
      )}
    </main>
  );
}
