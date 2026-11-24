import { useTranslation } from 'react-i18next'

const statusOptions = [
  {value: "all", labelKey: 'filters.all' },
  {value: "in_transit", labelKey: 'status.in_transit' },
  {value: "delivered", labelKey: 'status.delivered' },
  {value: "delayed", labelKey: 'status.delayed' },
  {value: "pending", labelKey: 'status.pending' },
]
export default function ShipmentsFilters({ search, onSearchChange, status, onStatusChange }) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input className="w-full rounded-lg border border-slate-200 bg-white outline-none px-3 py-2 text-sm sm:max-w-xs" type="search" aria-label={t('filters.searchLabel')} placeholder={t('filters.searchPlaceholder')} value={search} onChange={(event) => onSearchChange(event.target.value)}/>
      <select className="w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-48" onChange={(event) => onStatusChange(event.target.value)} aria-label={t('filters.statusLabel')} value={status}>
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>{t(option.labelKey)}</option>
        ))}
      </select>
    </div>
  )
}