import { useMemo, useState } from 'react'

const locations = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
]

const categories = [
  ['👨‍🌾', 'Farmer / Agricultural Worker'],
  ['🎓', 'Student'],
  ['👩', 'Woman / Girl'],
  ['👴', 'Senior Citizen (60+)'],
  ['♿', 'Person with Disability'],
  ['💼', 'Unemployed / Job Seeker'],
  ['🛒', 'Small Business Owner'],
  ['🙋', 'General / Other'],
]

function Wizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState({
    state: '',
    category: '',
    age: '',
    income: '',
    gender: '',
  })
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredLocations = useMemo(
    () => locations.filter((location) => location.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  const updateAnswer = (field, value) => {
    setAnswers((previousAnswers) => ({ ...previousAnswers, [field]: value }))
  }

  const selectState = (state) => {
    updateAnswer('state', state)
    setDropdownOpen(false)
    setSearch('')
  }

  const selectCategory = (category) => {
    updateAnswer('category', category)
    setCurrentStep(3)
  }

  const age = Number(answers.age)
  const validAge = Number.isInteger(age) && age >= 5 && age <= 100

  const setAge = (value) => {
    if (value === '') {
      updateAnswer('age', '')
      return
    }

    updateAnswer('age', value)
  }

  const adjustAge = (amount) => {
    const nextAge = Math.min(100, Math.max(5, (validAge ? age : 18) + amount))
    updateAnswer('age', String(nextAge))
  }

  return (
    <section id="wizard" className="scroll-mt-16 bg-navy px-5 py-20 sm:px-8" aria-labelledby="wizard-title">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between text-sm font-medium text-text-secondary">
          <span>Step {currentStep} of 5</span>
          <span>{Math.round((currentStep / 5) * 100)}% complete</span>
        </div>
        <div className="mb-10 h-2 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden="true">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple transition-[width] duration-500 ease-out"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-card/75 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
          >
            <div className="w-full shrink-0 p-6 sm:p-10">
              <div className="text-center">
                <span className="text-5xl" aria-hidden="true">🗺️</span>
                <h2 id="wizard-title" className="mt-5 font-['Playfair_Display'] text-3xl font-semibold text-text-primary sm:text-4xl">
                  Which state are you from?
                </h2>
                <p className="mt-3 text-text-secondary">Choose your state or union territory to see relevant schemes.</p>
              </div>

              <div className="relative mt-8 text-left">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-navy/70 px-4 py-4 text-left text-text-primary transition hover:border-accent-blue/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  aria-expanded={dropdownOpen}
                  aria-controls="state-options"
                >
                  <span className={answers.state ? 'text-text-primary' : 'text-text-secondary'}>
                    {answers.state || 'Select your state or union territory'}
                  </span>
                  <span className={`ml-4 text-text-secondary transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true">⌄</span>
                </button>

                {dropdownOpen && (
                  <div id="state-options" className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d1425] shadow-2xl shadow-black/40">
                    <div className="border-b border-white/[0.08] p-3">
                      <label className="sr-only" htmlFor="state-search">Search states and union territories</label>
                      <input
                        id="state-search"
                        autoFocus
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Escape') setDropdownOpen(false)
                        }}
                        placeholder="Search locations..."
                        className="w-full rounded-lg border border-white/10 bg-navy px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-blue focus:outline-none"
                      />
                    </div>
                    <ul className="max-h-56 overflow-y-auto py-1" role="listbox" aria-label="States and union territories">
                      {filteredLocations.length ? filteredLocations.map((location) => (
                        <li key={location}>
                          <button
                            type="button"
                            onClick={() => selectState(location)}
                            className="w-full px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-accent-blue/15 hover:text-white focus:bg-accent-blue/15 focus:outline-none"
                            role="option"
                            aria-selected={answers.state === location}
                          >
                            {location}
                          </button>
                        </li>
                      )) : (
                        <li className="px-4 py-5 text-center text-sm text-text-secondary">No matching locations found.</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <button
                type="button"
                disabled={!answers.state}
                onClick={() => setCurrentStep(2)}
                className="mt-8 w-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3.5 font-semibold text-white transition hover:shadow-[0_10px_28px_rgba(59,130,246,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-card active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
              >
                Continue <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="w-full shrink-0 p-6 sm:p-10">
              <button type="button" onClick={() => setCurrentStep(1)} className="text-sm font-medium text-text-secondary transition hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95">
                <span aria-hidden="true">← </span>Back
              </button>
              <div className="mt-5 text-center">
                <span className="text-5xl" aria-hidden="true">👤</span>
                <h2 className="mt-5 font-['Playfair_Display'] text-3xl font-semibold text-text-primary sm:text-4xl">Who are you?</h2>
                <p className="mt-3 text-text-secondary">Select the option that best describes you.</p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {categories.map(([icon, category]) => {
                  const selected = answers.category === category
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => selectCategory(category)}
                      className={`relative flex min-h-24 items-center gap-3 rounded-xl border p-4 text-left transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95 ${selected ? 'border-accent-blue bg-accent-blue text-white shadow-[0_0_24px_rgba(59,130,246,0.3)]' : 'border-white/10 bg-white/[0.04] text-slate-200 hover:scale-[1.02] hover:border-accent-blue/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.16)]'}`}
                      aria-pressed={selected}
                    >
                      <span className="text-2xl" aria-hidden="true">{icon}</span>
                      <span className="pr-5 text-sm font-medium leading-5">{category}</span>
                      {selected && <span className="absolute right-3 top-3 text-sm" aria-label="Selected">✓</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="w-full shrink-0 p-6 sm:p-10">
              <button type="button" onClick={() => setCurrentStep(2)} className="text-sm font-medium text-text-secondary transition hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95">
                <span aria-hidden="true">← </span>Back
              </button>
              <div className="mt-5 text-center">
                <span className="text-5xl" aria-hidden="true">🎂</span>
                <h2 className="mt-5 font-['Playfair_Display'] text-3xl font-semibold text-text-primary sm:text-4xl">How old are you?</h2>
                <p className="mt-3 text-text-secondary">Your age helps us find schemes tailored to you.</p>
              </div>

              <div className="mt-9 flex items-center justify-center gap-4 sm:gap-6">
                <button type="button" onClick={() => adjustAge(-1)} className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-3xl text-text-primary transition hover:border-accent-blue hover:bg-accent-blue/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95" aria-label="Decrease age">−</button>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={answers.age}
                  onChange={(event) => setAge(event.target.value)}
                  className="w-32 border-b-2 border-accent-blue bg-transparent py-2 text-center text-5xl font-semibold text-text-primary outline-none transition focus:border-accent-purple"
                  aria-label="Age, from 5 to 100"
                />
                <button type="button" onClick={() => adjustAge(1)} className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-3xl text-text-primary transition hover:border-accent-blue hover:bg-accent-blue/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95" aria-label="Increase age">+</button>
              </div>
              <p className="mt-3 text-center text-sm text-text-secondary">Enter an age between 5 and 100.</p>
              <input
                type="range"
                min="5"
                max="100"
                value={validAge ? age : 18}
                onChange={(event) => setAge(event.target.value)}
                className="mt-7 h-2 w-full cursor-pointer accent-accent-blue"
                aria-label="Age slider"
              />

              <button
                type="button"
                disabled={!validAge}
                onClick={() => setCurrentStep(4)}
                className="mt-9 w-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3.5 font-semibold text-white transition hover:shadow-[0_10px_28px_rgba(59,130,246,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-card active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
              >
                Continue <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="w-full shrink-0 p-6 text-center sm:p-10">
              <span className="text-5xl" aria-hidden="true">✨</span>
              <h2 className="mt-5 font-['Playfair_Display'] text-3xl font-semibold text-text-primary">More details coming next</h2>
              <p className="mt-3 text-text-secondary">Step 4 will collect the remaining information for your matches.</p>
              <button type="button" onClick={() => setCurrentStep(3)} className="mt-8 text-sm font-medium text-text-secondary transition hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue active:scale-95">
                <span aria-hidden="true">← </span>Back
              </button>
            </div>

            <div className="w-full shrink-0 p-6 text-center sm:p-10">
              <span className="text-5xl" aria-hidden="true">🏁</span>
              <h2 className="mt-5 font-['Playfair_Display'] text-3xl font-semibold text-text-primary">Almost there</h2>
              <p className="mt-3 text-text-secondary">Step 5 will show your personalized scheme results.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Wizard
