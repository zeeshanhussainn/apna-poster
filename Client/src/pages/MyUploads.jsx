import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function MyUploads() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: replace 'demo' with real user id from AuthContext
  const userId = "demo";

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/posters", { params: { userId } });
        setItems(res.data.posters || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load your posters");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Uploads</h2>
      {items.length === 0 ? (
        <div className="text-slate-300">No posters yet. Upload one!</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((p) => (
            <div key={p.id} className="bg-slate-800/60 rounded-lg p-2 border border-slate-700">
              <img
                src={`${import.meta.env.VITE_API_URL}${p.url}`}
                alt={p.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="mt-2 text-sm">{p.title || "Untitled"}</div>
              <div className="text-xs text-slate-400">{new Date(p.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
