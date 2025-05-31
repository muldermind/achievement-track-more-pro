"use client";

import Link from "next/link";

export default function AdminHome() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-8">Admin: Beheeropties</h1>
      <div className="space-y-4">
        <Link href="/admin/cat">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded">
            Categorieën beheren
          </button>
        </Link>
        <br />
        <Link href="/admin/ach">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded">
            Achievements beheren
          </button>
        </Link>
      </div>
    </main>
  );
}