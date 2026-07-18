function Hero() {
  const scrollToWizard = () => {
    document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-5 pb-20 pt-28 sm:px-8"
      aria-labelledby="hero-heading"
    >
      <style>{`
        @keyframes schemeSevaDriftOne {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(4%, -3%, 0) scale(1.08); }
        }
        @keyframes schemeSevaDriftTwo {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-4%, 4%, 0) scale(1.06); }
        }
        @keyframes schemeSevaDriftThree {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(3%, 4%, 0) scale(1.04); }
        }
        .scheme-seva-blob-one { animation: schemeSevaDriftOne 16s ease-in-out infinite; }
        .scheme-seva-blob-two { animation: schemeSevaDriftTwo 19s ease-in-out infinite; }
        .scheme-seva-blob-three { animation: schemeSevaDriftThree 18s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .scheme-seva-blob-one, .scheme-seva-blob-two, .scheme-seva-blob-three { animation: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="scheme-seva-blob-one absolute -left-32 top-12 h-80 w-80 rounded-full bg-accent-blue/25 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="scheme-seva-blob-two absolute -right-28 top-1/4 h-72 w-72 rounded-full bg-accent-purple/25 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
        <div className="scheme-seva-blob-three absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent-green/15 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute inset-0 bg-navy/55" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-100 shadow-[0_0_24px_rgba(59,130,246,0.14)] backdrop-blur-md sm:text-sm">
          <span aria-hidden="true">🇮🇳</span>
          100% Free <span className="text-text-secondary">·</span> No Login Required
        </p>

        <h1
          id="hero-heading"
          className="font-['Playfair_Display'] text-5xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-7xl"
        >
          <span className="block">Discover Schemes</span>
          <span className="block bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
            Made For You
          </span>
        </h1>

        <p className="mt-6 max-w-[500px] text-base leading-7 text-text-secondary sm:text-lg">
          Answer a few simple questions and find every government scheme you qualify for — with exact steps to apply.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3" aria-label="SchemeSeva benefits">
          {[
            ['⚡', 'Instant Results'],
            ['🏛️', 'All States'],
            ['✅', 'Free Forever'],
          ].map(([icon, label]) => (
            <span
              key={label}
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-md"
            >
              <span className="mr-1.5" aria-hidden="true">{icon}</span>
              {label}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollToWizard}
          className="scheme-seva-float mt-10 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-8 py-4 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.28)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(139,92,246,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy active:scale-[0.97]"
          aria-label="Find government schemes that match your eligibility"
        >
          Find My Schemes <span aria-hidden="true">→</span>
        </button>
      </div>

      <a
        href="#wizard"
        onClick={(event) => {
          event.preventDefault()
          scrollToWizard()
        }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-text-secondary transition hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
        aria-label="Scroll to the scheme finder"
      >
        <span>Explore</span>
        <span className="animate-bounce text-xl" aria-hidden="true">↓</span>
      </a>
    </section>
  )
}

export default Hero
