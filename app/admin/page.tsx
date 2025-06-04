"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebaseClient";

const ADMIN_EMAIL = "admin@tracker.app";

export default function AdminHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Toegang controleren...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">Admin: Beheeropties</h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link href="/admin/cat">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded shadow">
            Categorieën beheren
          </button>
        </Link>
        <Link href="/admin/ach">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded shadow">
            Achievements beheren
          </button>
        </Link>
      </div>
    </main>
  );
}
