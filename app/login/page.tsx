"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError("Login mislukt. Controleer je gegevens.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      {/* Branding icoon zonder glow of schaduw */}
      <img
        src="/icons/fellowship.png"
        alt="Logo"
        className="w-100 h-100 mb-4"
      />

      <h1 className="text-3xl font-bold mb-6">Log in</h1>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Wachtwoord"
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Inloggen
        </button>
      </form>
    </main>
  );
}
