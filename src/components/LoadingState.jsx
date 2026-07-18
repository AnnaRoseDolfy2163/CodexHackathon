import { useEffect, useMemo, useState } from 'react'

function LoadingState({ selectedState, results, onComplete }) {
  const messages = useMemo(
    () => [
      'Scanning central government schemes...',
      `Checking state-specific schemes for ${selectedState || 'your state'}...`,
      'Matching your profile...',
      'Preparing your results...',
    ],
    [selectedState],
  )
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length)
    }, 1500)
    const completionTimer = window.setTimeout(() => onComplete(results), 2500)

    return () => {
      window.clearInterval(messageTimer)
      window.clearTimeout(completionTimer)
    }
  }, [messages.length, onComplete, results])

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-navy/95 px-5 text-center backdrop-blur-xl" role="status" aria-live="polite">
      <div className="flex max-w-md flex-col items-center">
        <div className="relative h-24 w-24 animate-spin rounded-full bg-[conic-gradient(from_0deg,#3b82f6,#8b5cf6,#10b981,#3b82f6)] p-1 shadow-[0_0_35px_rgba(59,130,246,0.35)]" aria-hidden="true">
          <div className="h-full w-full rounded-full bg-navy" />
        </div>
        <h2 className="mt-8 font-['Playfair_Display'] text-3xl font-semibold text-text-primary">Finding your best matches</h2>
        <p className="mt-3 min-h-12 text-lg leading-7 text-text-secondary transition-opacity">{messages[messageIndex]}</p>
        <div className="mt-4 flex items-center gap-2" aria-label="Loading">
          {[0, 150, 300].map((delay) => (
            <span key={delay} className="h-2.5 w-2.5 animate-bounce rounded-full bg-accent-blue" style={{ animationDelay: `${delay}ms` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingState
