function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.05] bg-[rgba(10,15,30,0.85)] backdrop-blur-[20px]">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary navigation"
      >
        <a
          className="group inline-flex items-center gap-2 text-lg font-semibold"
          href="#top"
          aria-label="SchemeSeva home"
        >
          <span className="text-xl" aria-hidden="true">🛡️</span>
          <span
            className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text font-['Playfair_Display'] text-xl tracking-tight text-transparent"
          >
            SchemeSeva
          </span>
        </a>

        <p className="hidden text-xs font-medium tracking-wide text-text-secondary min-[380px]:block sm:text-sm">
          Welfare, Simplified
        </p>
      </nav>
    </header>
  )
}

export default Navbar
