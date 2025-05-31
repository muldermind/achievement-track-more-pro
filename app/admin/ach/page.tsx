'use client';

import { useState, useEffect } from 'react';
import { database } from '@/firebaseConfig';
import {
  ref,
  push,
  update,
  remove,
  onValue,
  set,
} from 'firebase/database';
import Link from 'next/link';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<{ [key: string]: any }>({});
  const [newCategory, setNewCategory] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    const categoriesRef = ref(database, 'achievements/categories');
    const unsubscribe = onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val() || {};
      setCategories(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    const newKey = newCategory.toLowerCase().replace(/\s+/g, '-');
    await set(ref(database, `achievements/categories/${newKey}`), {
      name: newCategory,
      published: true,
    });
    setNewCategory('');
  };

  const handleDeleteCategory = async (key: string) => {
    if (confirm('Weet je zeker dat je deze categorie wilt verwijderen?')) {
      await remove(ref(database, `achievements/categories/${key}`));
    }
  };

  const handleEditCategory = async (key: string) => {
    await update(ref(database, `achievements/categories/${key}`), {
      name: editingValue,
    });
    setEditingKey(null);
  };

  const togglePublished = async (key: string) => {
    const current = categories[key]?.published;
    await update(ref(database, `achievements/categories/${key}`), {
      published: !current,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Categorieën beheren</h1>
        <Link
          href="/admin"
          className="inline-block mb-4 text-yellow-400 hover:underline"
        >
          ← Terug naar admin
        </Link>

        <div className="bg-slate-800 p-4 rounded-xl mb-6">
          <h2 className="text-md mb-2">Nieuwe categorie toevoegen</h2>
          <input
            type="text"
            className="w-full p-2 rounded bg-slate-700 text-white mb-2"
            placeholder="Naam"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            onClick={handleAddCategory}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Toevoegen
          </button>
        </div>

        {Object.entries(categories).map(([key, value]) => (
          <div
            key={key}
            className="bg-slate-800 p-4 rounded-xl mb-4 flex items-center justify-between"
          >
            {editingKey === key ? (
              <input
                className="bg-slate-700 p-2 rounded w-full mr-2"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
              />
            ) : (
              <span className="font-bold">
                {value.name}{' '}
                {!value.published && (
                  <span className="text-sm text-red-400">(concept)</span>
                )}
              </span>
            )}

            <div className="flex gap-2 ml-4">
              {editingKey === key ? (
                <button
                  onClick={() => handleEditCategory(key)}
                  className="text-green-400 hover:text-green-300"
                >
                  Opslaan
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingKey(key);
                      setEditingValue(value.name);
                    }}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    Bewerk
                  </button>
                  <button
                    onClick={() => togglePublished(key)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {value.published ? 'Verberg' : 'Publiceer'}
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(key)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Verwijder
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
