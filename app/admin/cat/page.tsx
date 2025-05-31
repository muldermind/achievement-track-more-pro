'use client';

import { useEffect, useState } from "react";
import { ref, onValue, update, remove, set } from "firebase/database";
import { database } from "../../../firebaseConfig";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", published: true });
  const [editKey, setEditKey] = useState<string | null>(null);

  useEffect(() => {
    const catRef = ref(database, "categories");
    return onValue(catRef, (snapshot) => {
      const data = snapshot.val() || {};
      const result = Object.entries(data).map(([key, val]: any) => ({ key, ...val }));
      setCategories(result);
    });
  }, []);

  const handleAddOrUpdate = () => {
    if (!form.name) return;
    const newKey = form.name.toLowerCase().replace(/\s+/g, "-");
    if (editKey) {
      update(ref(database, `categories/${editKey}`), form);
      setEditKey(null);
    } else {
      set(ref(database, `categories/${newKey}`), form);
    }
    setForm({ name: "", published: true });
  };

  const handleDelete = (key: string) => {
    remove(ref(database, `categories/${key}`));
  };

  const handleEdit = (cat: any) => {
    setEditKey(cat.key);
    setForm({ name: cat.name, published: cat.published });
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Categorieën beheren</h1>
        <Link href="/admin" className="inline-block mb-4 text-yellow-400 hover:underline">
          ← Terug naar admin
        </Link>

        <div className="bg-slate-800 p-4 rounded-xl mb-6">
          <h2 className="text-md mb-2">Nieuwe categorie toevoegen</h2>
          <input
            type="text"
            className="w-full p-2 rounded bg-slate-700 text-white mb-2"
            placeholder="Naam"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <label className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            <span>Gepubliceerd</span>
          </label>
          <button
            onClick={handleAddOrUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {editKey ? "Bijwerken" : "Toevoegen"}
          </button>
        </div>

        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.key} className="flex items-center justify-between bg-slate-800 p-4 rounded">
              <div>
                <strong>{cat.name}</strong>
                <p className="text-sm text-gray-400">
                  Gepubliceerd: {cat.published ? "Ja" : "Nee"}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-yellow-500 px-3 py-1 rounded text-black font-semibold"
                >
                  Bewerken
                </button>
                <button
                  onClick={() => handleDelete(cat.key)}
                  className="bg-red-600 px-3 py-1 rounded text-white font-semibold"
                >
                  Verwijderen
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
