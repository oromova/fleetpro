export default function Header({ onMenuClick }) {
  
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-8 md:py-5">
      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-slate-200 p-2 md:hidden hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" type="button" aria-label="Menyuni ochish" onClick={onMenuClick}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>

        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
      </div>

      <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" type="button">Yangi yuk</button>
    </header>
  )
}