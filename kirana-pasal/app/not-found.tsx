export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 text-slate-900">
      <div className="max-w-xl w-full rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/40 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">404 — Page not found</p>
        <h1 className="text-4xl font-semibold mb-4">We couldn&apos;t find that page.</h1>
        <p className="text-slate-600 mb-8">The page you are looking for does not exist or has moved. Please go back home to continue shopping.</p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
        >
          Back to home
        </a>
      </div>
    </main>
  );
}
