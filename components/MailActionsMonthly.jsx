"use client";
import { useRouter } from "next/navigation";

export default function MailActions({ id }) {
  const router = useRouter();

  async function handleAction(action) {
    await fetch(`/api/monthly/mail/${id}/selection`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    // 🔴 redirection après suppression
    router.push("/monthly/mails");
    router.refresh(); // optionnel mais recommandé
  }

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => handleAction("keep")}
        className="px-4 py-2 border rounded hover:bg-green-100"
      >
        保管する（Forever）
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
