import { useEffect, useState } from 'react'

function Accordion({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-t border-white/[0.08]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-12 w-full items-center justify-between gap-3 py-3 text-left text-sm font-semibold text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95"
        aria-expanded={open}
      >
        <span>{icon} {title}</span>
        <span className={`text-text-secondary transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">⌄</span>
      </button>
      {open && <div className="pb-4 text-sm leading-6 text-text-secondary">{children}</div>}
    </div>
  )
}

function SchemeCard({ scheme, index }) {
  const [copied, setCopied] = useState(false)
  const [comingSoon, setComingSoon] = useState(false)

  useEffect(() => {
    if (!copied && !comingSoon) return undefined
    const timer = window.setTimeout(() => {
      setCopied(false)
      setComingSoon(false)
    }, 2000)
    return () => window.clearTimeout(timer)
  }, [copied, comingSoon])

  const shareScheme = async () => {
    const content = `${scheme.name}\n\nHow to Apply:\n${scheme.howToApply}`
    try {
      await navigator.clipboard.writeText(content)
    } catch {
      // Clipboard permission can be unavailable in some embedded browsers.
    }
    setCopied(true)
  }

  const officialLinks = Array.isArray(scheme.officialLinks) && scheme.officialLinks.length
    ? scheme.officialLinks
    : ['Official scheme portal', 'Application guidance']
  const tags = Array.isArray(scheme.tags) ? scheme.tags : []

  return (
    <article
      className="scheme-seva-fade-up relative overflow-hidden rounded-2xl border border-white/10 bg-card/75 shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent-blue/60 hover:shadow-[0_18px_40px_rgba(59,130,246,0.16)]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent-blue via-accent-purple to-accent-green" aria-hidden="true" />
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-text-primary sm:text-2xl">{scheme.name}</h3>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${scheme.type === 'State' ? 'bg-accent-purple/15 text-purple-200' : 'bg-accent-blue/15 text-blue-200'}`}>
            {scheme.type}
          </span>
        </div>
        <p className="mt-3 text-base leading-7 text-slate-200">{scheme.benefit}</p>

        <div className="mt-5">
          <Accordion title="Why You Qualify" icon="✅" defaultOpen>
            {scheme.eligibility}
          </Accordion>
          <Accordion title="How To Apply" icon="📋">
            {scheme.howToApply}
          </Accordion>
          <Accordion title="Official Links" icon="🔗">
            <div className="flex flex-wrap gap-2">
              {officialLinks.map((link) => (
                <button key={typeof link === 'string' ? link : link.label} type="button" onClick={() => setComingSoon(true)} className="min-h-11 rounded-lg border border-accent-blue/30 bg-accent-blue/10 px-3 text-xs font-semibold text-blue-100 transition hover:bg-accent-blue/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95">
                  {typeof link === 'string' ? link : link.label}
                </button>
              ))}
            </div>
          </Accordion>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => <span key={tag} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-text-secondary">{tag}</span>)}
          </div>
          <button type="button" onClick={shareScheme} className="min-h-11 rounded-full border border-white/10 px-4 text-sm font-semibold text-slate-200 transition hover:border-accent-blue/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95">
            Share
          </button>
        </div>
      </div>

      {(copied || comingSoon) && (
        <div className="scheme-seva-toast fixed bottom-5 right-5 z-[80] rounded-xl border border-white/10 bg-card px-4 py-3 text-sm font-semibold text-text-primary shadow-2xl shadow-black/40" role="status">
          {copied ? 'Copied! ✓' : 'Coming soon!'}
        </div>
      )}
    </article>
  )
}

export default SchemeCard
