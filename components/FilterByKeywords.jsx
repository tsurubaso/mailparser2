import keywords from "@/data/keywordslist.json";

export default function FilterByKeywords() {
  return (
    <section className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        Filter by keywords
      </h2>

      {/* Keywords depuis le JSON */}
      <div className="flex flex-wrap gap-4 mb-4">
        {keywords.map((k) => (
          <label key={k.name} className="flex items-center gap-2 text-sm">
            <input type="checkbox" value={k.name} />
            {k.name}
          </label>
        ))}
      </div>

      {/* Custom keyword */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add custom keyword…"
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button className="px-4 py-2 bg-black text-white rounded text-sm">
          Apply
        </button>
      </div>
    </section>
  );
}
