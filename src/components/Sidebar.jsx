import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const links = [
  { labelKey: 'nav.dashboard', to: '/' },
  { labelKey: 'nav.shipments', to: '/shipments' },
  { labelKey: 'nav.drivers', to: '/drivers' },
  { labelKey: 'nav.map', to: '/map' },
]

export default function Sidebar({ open, onClose }) {

  const { t } = useTranslation()

  return (
    <aside className={`${open ? "block" : "hidden"} fixed inset-y-0 left-0 z-20 w-60 bg-slate-900 p-4 md:static md:block`}>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xl font-bold text-white">FleetPro</p>

        <button type="button" aria-label={t('nav.close')} onClick={onClose} className="rounded-lg p-2 text-slate-300 md:hidden">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" />
          </svg>
        </button>
      </div>

      <nav aria-label={t('nav.main')} className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={onClose} className={({ isActive }) =>  `block rounded-lg px-3 py-2 text-sm transition-colors ${ isActive ? 'bg-blue-700 text-white' : 'text-slate-300 hover:bg-blue-600 hover:text-white'}`}>{t(link.labelKey)}</NavLink>
        ))}
      </nav>
    </aside>
  )
}