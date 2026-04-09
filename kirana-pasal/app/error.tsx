"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 text-slate-900">
      <div className="max-w-xl w-full rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/40 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">Something went wrong</p>
        <h1 className="text-4xl font-semibold mb-4">Oops.</h1>
        <p className="text-slate-600 mb-8">An unexpected error occurred. Try again or return home.</p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
