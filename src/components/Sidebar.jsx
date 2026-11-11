const links = ["Dashboard", "Yuklar", "Haydovchi", "Mashinalar", "Xarita"]

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`${open ? "block" : "hidden"} fixed inset-y-0 left-0 z-20 w-60 bg-slate-900 p-4 md:static md:block`}>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xl font-bold text-white">FleetPro</p>

        <button type="button" aria-label="Menyuni yopish" onClick={onClose} className="rounded-lg p-2 text-slate-300 md:hidden">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" />
          </svg>
        </button>
      </div>

      <nav aria-label="Asosiy menyu">
        {links.map((link) => (
          <a className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-blue-600 hover:text-white focus-visible:bg-blue-600 focus-visible:text-white focus-visible:outline-none transition-colors" key={link} href="#">{link}</a>
        ))}
      </nav>
    </aside>
  )
}