import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Wizard from './components/Wizard.jsx'
import Results from './components/Results.jsx'
import callOpenAI from './api.js'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [keyDraft, setKeyDraft] = useState('')
  const [keyModalOpen, setKeyModalOpen] = useState(false)
  const [pendingAnswers, setPendingAnswers] = useState(null)
  const [lastAnswers, setLastAnswers] = useState(null)
  const [schemes, setSchemes] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!keyModalOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setKeyModalOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [keyModalOpen])

  const requestSchemes = async (answers, key = apiKey) => {
    setLastAnswers(answers)
    setError('')
    setSchemes([])

    try {
      const matches = await callOpenAI(answers, key)
      setSchemes(matches)
    } catch (requestError) {
      setError(
        requestError.code === 'PARSE_FAILED'
          ? 'Something went wrong. Please try again.'
          : 'Connection failed. Check your internet connection and try again.',
      )
    }
  }

  const handleWizardComplete = (answers) => {
    if (!apiKey) {
      setPendingAnswers(answers)
      setKeyModalOpen(true)
      return
    }

    requestSchemes(answers)
  }

  const saveApiKey = (event) => {
    event.preventDefault()
    const savedKey = keyDraft.trim()
    if (!savedKey) return

    setApiKey(savedKey)
    setKeyDraft('')
    setKeyModalOpen(false)

    if (pendingAnswers) {
      requestSchemes(pendingAnswers, savedKey)
      setPendingAnswers(null)
    }
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Wizard onComplete={handleWizardComplete} />
      <Results schemes={schemes} error={error} onTryAgain={() => lastAnswers && requestSchemes(lastAnswers)} />

      <button
        type="button"
        onClick={() => setKeyModalOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/90 px-4 py-3 text-sm font-semibold text-text-primary shadow-xl shadow-black/30 backdrop-blur-xl transition hover:-translate-y-1 hover:border-accent-blue/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95"
        aria-label="Set OpenAI API key"
      >
        <span aria-hidden="true">🔑</span> API Key
        {apiKey && <span className="h-2.5 w-2.5 rounded-full bg-accent-green shadow-[0_0_10px_rgba(16,185,129,0.9)]" aria-label="API key saved" />}
      </button>

      {keyModalOpen && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-navy/75 px-5 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setKeyModalOpen(false)
          }}
        >
          <form
            onSubmit={saveApiKey}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-card p-6 shadow-2xl shadow-black/50 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="api-key-title"
          >
            <button type="button" onClick={() => setKeyModalOpen(false)} className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-text-secondary transition hover:bg-white/10 hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue" aria-label="Close API key dialog">×</button>
            <h2 id="api-key-title" className="pr-8 font-['Playfair_Display'] text-2xl font-semibold text-text-primary">Enter your OpenAI API Key</h2>
            <label className="mt-6 block text-sm font-medium text-slate-200" htmlFor="api-key-input">API key</label>
            <input
              id="api-key-input"
              autoFocus
              type="password"
              value={keyDraft}
              onChange={(event) => setKeyDraft(event.target.value)}
              placeholder="sk-..."
              className="mt-2 w-full rounded-xl border border-white/10 bg-navy px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/30"
            />
            <button type="submit" disabled={!keyDraft.trim()} className="mt-5 w-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-3 font-semibold text-white transition hover:shadow-[0_10px_28px_rgba(59,130,246,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
              Save Key
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-text-secondary">Your key is only used to call OpenAI directly. It is never stored.</p>
          </form>
        </div>
      )}
    </>
  )
}

export default App
