'use client';

import { useEffect, useState } from 'react';
import { ref, onValue, update, push, remove, set } from 'firebase/database';
import { database } from '../../../firebaseConfig';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Pencil, Trash2, RotateCw } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  image: string;
  completed?: boolean;
  proof?: string | null;
  order?: number;
}

export default function AchievementAdmin() {
  const [categories, setCategories] = useState<{ key: string; name: string }[]>([]);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [form, setForm] = useState({ title: '', description: '', image: '' });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const catRef = ref(database, 'categories');
    return onValue(catRef, (snapshot) => {
      const data = snapshot.val() || {};
      const result = Object.entries(data)
        .filter(([, val]: any) => val.published)
        .map(([key, val]: any) => ({ key, name: val.name }));
      setCategories(result);
      if (!selectedCat && result.length > 0) {
        setSelectedCat(result[0].key);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedCat) return;
    const achRef = ref(database, `categories/${selectedCat}/achievements`);
    return onValue(achRef, (snapshot) => {
      const data = snapshot.val() || {};
      const result = Object.entries(data)
        .map(([id, val]: any) => ({
          id,
          ...val,
        }))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setAchievements(result);
    });
  }, [selectedCat]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !selectedCat) return;
    const reordered = Array.from(achievements);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    const updates: any = {};
    reordered.forEach((item, i) => {
      updates[`categories/${selectedCat}/achievements/${item.id}/order`] = i;
    });
    update(ref(database), updates);
    setAchievements(reordered);
  };

  const handleAddOrUpdate = () => {
    if (!form.title || !form.description || !form.image || !selectedCat) return;

    if (editId) {
      update(ref(database, `categories/${selectedCat}/achievements/${editId}`), {
        title: form.title,
        description: form.description,
        image: form.image,
      });
      setEditId(null);
    } else {
      const newRef = push(ref(database, `categories/${selectedCat}/achievements`));
      set(newRef, {
        title: form.title,
        description: form.description,
        image: form.image,
        completed: false,
        proof: null,
        order: achievements.length,
      });
    }

    setForm({ title: '', description: '', image: '' });
  };

  const handleDelete = (id: string) => {
    if (!selectedCat) return;
    const confirmDelete = window.confirm("Weet je zeker dat je deze achievement wilt verwijderen?");
    if (confirmDelete) {
      remove(ref(database, `categories/${selectedCat}/achievements/${id}`));
    }
  };

  const handleReset = (id: string) => {
    if (!selectedCat) return;
    update(ref(database, `categories/${selectedCat}/achievements/${id}`), {
      completed: false,
      proof: null,
    });
  };

  const handleEdit = (achievement: Achievement) => {
    setEditId(achievement.id);
    setForm({
      title: achievement.title,
      description: achievement.description,
      image: achievement.image,
    });
  };

  return (
    <div className="p-4 min-h-screen bg-black text-white max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin: Achievements beheren</h1>
      <div className="flex gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setSelectedCat(cat.key);
              setEditId(null);
              setForm({ title: '', description: '', image: '' });
            }}
            className={`px-4 py-2 border rounded font-bold ${
              selectedCat === cat.key ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {selectedCat && (
        <>
          <div className="bg-gray-900 p-4 rounded mb-6">
            <h2 className="font-semibold mb-2">{editId ? 'Achievement bewerken' : 'Nieuwe achievement toevoegen'}</h2>
            <input
              type="text"
              placeholder="Titel"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
            />
            <textarea
              placeholder="Beschrijving"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              placeholder="Afbeeldings-URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
            />
            <button onClick={handleAddOrUpdate} className="bg-green-500 px-4 py-2 rounded text-white font-bold">
              {editId ? 'Bijwerken' : 'Toevoegen'}
            </button>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="achievementList">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {achievements.map((ach, index) => (
                    <Draggable key={ach.id} draggableId={ach.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 border rounded bg-gray-800 shadow flex items-center justify-between"
                        >
                          <div>
                            <strong>{ach.title}</strong>
                            <p className="text-sm text-gray-300 mb-2">{ach.description}</p>
                            {ach.image && (
                              <img src={ach.image} alt={ach.title} className="w-16 h-16 object-cover" />
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(ach)}
                              className="text-yellow-400 hover:text-yellow-600"
                            >
                              <Pencil size={16} />
                            </button>
                            {ach.completed && (
                              <button
                                onClick={() => handleReset(ach.id)}
                                className="text-blue-400 hover:text-blue-600"
                              >
                                <RotateCw size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(ach.id)}
                              className="text-red-400 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </div>
  );
}
