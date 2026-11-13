
import { useEffect, useState } from 'react'

import courtroom from '@/assets/courtroom.svg'
import courtroomData from './courtroomData'

import InfoPanel from './InfoPanel'
import CourtroomHotspot from './CourtroomHotspot'
import QuizModal from './QuizModal'

function NyaayDarshan({ onExit }) {
  const [selectedRole, setSelectedRole] = useState(null)
  const [language, setLanguage] = useState('en')
  const [exploredRoles, setExploredRoles] = useState([])
  const [showCompletion, setShowCompletion] = useState(false)
  const [completionDismissed, setCompletionDismissed] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)

  const totalElements = Object.keys(courtroomData).length

  const progress = totalElements
    ? Math.round((exploredRoles.length / totalElements) * 100)
    : 0

  function handleExplore(roleKey) {
    setSelectedRole(roleKey)

    setExploredRoles((prev) =>
      prev.includes(roleKey) ? prev : [...prev, roleKey]
    )
  }

  useEffect(() => {
    if (
      exploredRoles.length === totalElements &&
      totalElements > 0 &&
      selectedRole === null &&
      !completionDismissed &&
      !showQuiz
    ) {
      setShowCompletion(true)
    }
  }, [
    exploredRoles.length,
    totalElements,
    selectedRole,
    completionDismissed,
    showQuiz,
  ])

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8 text-foreground">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <button
              onClick={onExit}
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
            >
              ← Back to Games
            </button>
          </div>

          {/* Language Switcher and Quiz Button */}
          <div className="flex flex-wrap items-center gap-3">

            <div className="inline-flex rounded-xl border border-border bg-card p-1 shadow-sm">

              <button
                onClick={() => setLanguage('en')}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                English
              </button>

              <button
                onClick={() => setLanguage('hi')}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  language === 'hi'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                हिन्दी
              </button>

            </div>

            <button
              onClick={() => setShowQuiz(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Test Yourself →
            </button>

          </div>
        </header>

        {/* Exploration Progress Card */}
        <section className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm">

          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>
              <h2
                className="text-lg font-semibold text-foreground"
                style={{ fontFamily: "'Newsreader', serif" }}
              >
                Your courtroom exploration
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Click on the highlighted areas to discover more.
              </p>
            </div>

            <span className="w-fit rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-primary">
              {exploredRoles.length} / {totalElements} Discovered
            </span>

          </div>

          {/* Progress Bar */}
          <div
            className="relative h-2.5 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2 flex justify-end">
            <span className="text-xs font-medium text-primary">
              {progress}% Complete
            </span>
          </div>

        </section>

        {/* Courtroom Illustration */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">


          <div className="relative w-full select-none">

            <img
              src={courtroom}
              alt="Interactive Indian courtroom layout"
              className="block h-auto w-full object-cover"
            />

            {/* Interactive Hotspots */}

            <CourtroomHotspot
              position="left-[46%] top-[30%] h-[16%] w-[8%]"
              label="Presiding Judge"
              onClick={() => handleExplore('judge')}
            />

            <CourtroomHotspot
              position="left-[30%] top-[36%] h-[14%] w-[6%]"
              label="Bench Clerk / Reader"
              onClick={() => handleExplore('clerk')}
            />

            <CourtroomHotspot
              position="left-[65%] top-[36%] h-[14%] w-[6%]"
              label="Stenographer / Court Typist"
              onClick={() => handleExplore('stenographer')}
            />

            <CourtroomHotspot
              position="left-[27%] top-[57%] h-[16%] w-[6%]"
              label="Public Prosecutor"
              onClick={() => handleExplore('prosecutor')}
            />

            <CourtroomHotspot
              position="left-[54%] top-[57%] h-[16%] w-[6%]"
              label="Defence Counsel"
              onClick={() => handleExplore('defence')}
            />

            <CourtroomHotspot
              position="left-[39%] top-[57%] h-[16%] w-[6%]"
              label="Legal Intern / Junior"
              onClick={() => handleExplore('junior')}
            />

            <CourtroomHotspot
              position="left-[66%] top-[57%] h-[16%] w-[6%]"
              label="Legal Intern / Junior"
              onClick={() => handleExplore('junior')}
            />

            <CourtroomHotspot
              position="left-[83%] top-[40%] h-[15%] w-[6%]"
              label="Accused"
              onClick={() => handleExplore('accused')}
            />

            <CourtroomHotspot
              position="left-[13%] top-[40%] h-[15%] w-[6%]"
              label="Witness"
              onClick={() => handleExplore('witness')}
            />

            <CourtroomHotspot
              position="left-[10%] top-[62%] h-[13%] w-[14%]"
              label="Complainant / Victim"
              onClick={() => handleExplore('complainant')}
            />

            <CourtroomHotspot
              position="left-[77%] top-[70%] h-[15%] w-[6%]"
              label="Investigating Officer"
              onClick={() => handleExplore('investigatingOfficer')}
            />

            <CourtroomHotspot
              position="left-[85%] top-[70%] h-[15%] w-[11%]"
              label="Police Escort Team"
              onClick={() => handleExplore('policeEscort')}
            />

            <CourtroomHotspot
              position="left-[92%] top-[48%] h-[18%] w-[6%]"
              label="Court Security"
              onClick={() => handleExplore('courtSecurity')}
            />

            <CourtroomHotspot
              position="left-[17%] top-[77%] h-[15%] w-[6%]"
              label="Court Reporter / Journalist"
              onClick={() => handleExplore('courtReporter')}
            />

            <CourtroomHotspot
              position="left-[30%] top-[77%] h-[15%] w-[39%]"
              label="Public Gallery"
              onClick={() => handleExplore('publicGallery')}
            />

            <CourtroomHotspot
              position="left-[37%] top-[44%] h-[12%] w-[26%]"
              label="Judge's Bench / Dais"
              onClick={() => handleExplore('judgeBench')}
            />

            <CourtroomHotspot
              position="left-[80%] top-[49%] h-[10%] w-[12%]"
              label="Accused Dock / Kathehra"
              onClick={() => handleExplore('accusedDock')}
            />

            <CourtroomHotspot
              position="left-[10%] top-[49%] h-[10%] w-[13%]"
              label="Witness Box / Enclosure"
              onClick={() => handleExplore('witnessBlock')}
            />

            <CourtroomHotspot
              position="left-[4%] top-[54%] h-[14%] w-[6%]"
              label="Bailiff / Chobdar"
              onClick={() => handleExplore('bailiff')}
            />

          </div>
        </section>

        {/* Selected Role Panel */}
        <InfoPanel
          role={
            selectedRole
              ? courtroomData[selectedRole]?.[language]
              : null
          }
          onClose={() => setSelectedRole(null)}
        />

        {/* Completion Modal */}
        {showCompletion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-7 text-center shadow-2xl">

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-3xl">
                🏆
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Exploration Complete
              </span>

              <h3
                className="mt-2 text-2xl font-bold text-foreground"
                style={{ fontFamily: "'Newsreader', serif" }}
              >
                Courtroom Mastered!
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You have explored all the roles and key locations in the
                courtroom. Ready to test your knowledge with a brief quiz?
              </p>

              <div className="mt-6 flex flex-col gap-3">

                <button
                  onClick={() => {
                    setShowCompletion(false)
                    setCompletionDismissed(true)
                    setShowQuiz(true)
                  }}
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                >
                  Start Quiz Now →
                </button>

                <button
                  onClick={() => {
                    setShowCompletion(false)
                    setCompletionDismissed(true)
                  }}
                  className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  Continue Reviewing
                </button>

              </div>
            </div>
          </div>
        )}

        {/* NyaayDarshan's Own Quiz Modal */}
        {showQuiz && (
          <QuizModal
            onClose={() => {
              setShowQuiz(false)
              setCompletionDismissed(true)
            }}
          />
        )}

      </div>
    </div>
  )
}

export default NyaayDarshan
