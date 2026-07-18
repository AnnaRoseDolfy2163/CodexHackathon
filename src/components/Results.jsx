import { useMemo, useState } from 'react'
import SchemeCard from './SchemeCard.jsx'

const filters = ['All', 'Central', 'State']

function Results({ schemes, onReset, error, onTryAgain, isLoading, hasSearched }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const filteredSchemes = useMemo(
    () => activeFilter === 'All' ? schemes : schemes.filter((scheme) => scheme.type === activeFilter),
    [activeFilter, schemes],
  )

  if (!hasSearched && !isLoading && !error) return null

  return (
    <section id="results" className="scroll-mt-16 bg-navy px-5 pb-24 pt-8 sm:px-8" aria-live="polite">
      <div className="mx-auto max-w-4xl">
        {isLoading ? (
          <div className="space-y-4" aria-label="Loading scheme results">
            {[0, 1, 2].map((item) => <div key={item} className="h-56 animate-pulse rounded-2xl border border-white/[0.06] bg-card/70" />)}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-7 text-center shadow-xl shadow-black/20">
            <p className="text-lg font-medium text-text-primary">{error}</p>
            <button type="button" onClick={onTryAgain} className="mt-5 min-h-11 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3 font-semibold text-white transition hover:shadow-[0_10px_28px_rgba(59,130,246,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95">Try Again</button>
          </div>
        ) : schemes.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-card/70 p-8 text-center shadow-xl shadow-black/20">
            <span className="text-5xl" aria-hidden="true">🔍</span>
            <h2 className="mt-4 font-['Playfair_Display'] text-3xl font-semibold text-text-primary">No schemes found</h2>
            <p className="mt-3 text-text-secondary">Try selecting General /Other as your category</p>
            <button type="button" onClick={onReset} className="mt-6 min-h-11 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3 font-semibold text-white transition hover:shadow-[0_10px_28px_rgba(59,130,246,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95">Try Again</button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-['Playfair_Display'] text-3xl font-semibold text-text-primary sm:text-4xl">Your Personalised Schemes</h2>
                  <span className="rounded-full bg-accent-green/15 px-3 py-1 text-xs font-bold text-emerald-200">{schemes.length} schemes found</span>
                </div>
                <p className="mt-2 text-text-secondary">Real central and state schemes matched to your profile</p>
              </div>
              <button type="button" onClick={onReset} className="min-h-11 shrink-0 rounded-full border border-accent-blue/60 px-5 py-2 text-sm font-semibold text-blue-100 transition hover:bg-accent-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95">Search Again</button>
            </div>

            <div className="mt-7 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter schemes">
              {filters.map((filter) => {
                const active = activeFilter === filter
                return <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95 ${active ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_8px_22px_rgba(59,130,246,0.25)]' : 'bg-card text-text-secondary hover:text-text-primary'}`} role="tab" aria-selected={active}>{filter}</button>
              })}
            </div>

            <div className="mt-5 grid gap-4">
              {filteredSchemes.length ? filteredSchemes.map((scheme, index) => <SchemeCard key={`${scheme.name}-${scheme.type}`} scheme={scheme} index={index} />) : (
                <p className="rounded-xl border border-white/10 bg-card/60 p-5 text-center text-text-secondary">No {activeFilter.toLowerCase()} schemes found in these results.</p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Results
