"use client";

import { useEffect, useState } from "react";
import keywords from "@/data/keywordslist.json";

export default function FilterByKeywords({ onChange }) {
  const [selected, setSelected] = useState([]);

  function toggleKeyword(name) {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((k) => k !== name)
        : [...prev, name]
    );
  }

  // 🔑 Notify parent AFTER render
  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  return (
    <section className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        Filter by keywords
      </h2>

      <div className="flex flex-wrap gap-4">
        {keywords.map((k) => (
          <label key={k.name} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(k.name)}
              onChange={() => toggleKeyword(k.name)}
            />
            {k.name}
          </label>
        ))}
      </div>
    </section>
  );
}
