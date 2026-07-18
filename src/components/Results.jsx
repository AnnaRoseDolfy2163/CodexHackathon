function Results({ schemes, error, onTryAgain }) {
  if (!error && !schemes.length) return null

  return (
    <section id="results" className="bg-navy px-5 pb-20 sm:px-8" aria-live="polite">
      <div className="mx-auto max-w-4xl">
        {error ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-6 text-center shadow-xl shadow-black/20">
            <p className="text-lg font-medium text-text-primary">{error}</p>
            <button type="button" onClick={onTryAgain} className="mt-5 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3 font-semibold text-white transition hover:shadow-[0_10px_28px_rgba(59,130,246,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95">
              Try Again
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-['Playfair_Display'] text-3xl font-semibold text-text-primary sm:text-4xl">Your matching schemes</h2>
            <div className="mt-6 grid gap-4">
              {schemes.map((scheme) => (
                <article key={`${scheme.name}-${scheme.type}`} className="rounded-2xl border border-white/10 bg-card p-5 shadow-xl shadow-black/10">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-text-primary">{scheme.name}</h3>
                    <span className="rounded-full bg-accent-blue/15 px-3 py-1 text-xs font-semibold text-blue-200">{scheme.type}</span>
                  </div>
                  <p className="mt-3 text-text-secondary">{scheme.benefit}</p>
                  <p className="mt-4 text-sm text-slate-300"><span className="font-semibold text-text-primary">Eligibility:</span> {scheme.eligibility}</p>
                  <p className="mt-2 text-sm text-slate-300"><span className="font-semibold text-text-primary">How to apply:</span> {scheme.howToApply}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Results
