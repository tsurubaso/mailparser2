async function fetchMails() {
  const res = await fetch("http://localhost:3000/api/mail/list", {
    cache: "no-store",
  });

  return res.json();
}

export default async function MailsPage() {
  const data = await fetchMails();

  return (
    <main>
      <h1>Mails</h1>

      <ul>
        {data.mails.map((mail) => (
          <li key={mail.id}>
            <strong>{mail.subject}</strong><br />
            <small>{mail.sender}</small><br />
            <em>{new Date(mail.received_at).toLocaleString()}</em>
            <p>{mail.preview}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
