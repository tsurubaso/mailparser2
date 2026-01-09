"use client";

export default function MailActions({ id }) {
  async function handleAction(action) {
    await fetch(`/api/mail/${id}/selection`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
  }

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => handleAction("keep")}
        className="px-4 py-2 border rounded hover:bg-green-100"
      >
        保管する（1ヶ月）
      </button>

      <button
        onClick={() => handleAction("delete")}
        className="px-4 py-2 border rounded hover:bg-red-100"
      >
        手動削除
      </button>
    </div>
  );
}
