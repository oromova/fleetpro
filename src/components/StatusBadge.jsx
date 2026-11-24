import { useTranslation } from 'react-i18next'

const statusStyles = {
  delivered: { labelKey: 'status.delivered', className: 'bg-green-100 text-green-700' },
  in_transit: { labelKey: 'status.in_transit', className: 'bg-blue-100 text-blue-700' },
  delayed: { labelKey: 'status.delayed', className: 'bg-red-100 text-red-700' },
  pending: { labelKey: 'status.pending', className: 'bg-gray-100 text-gray-700' },
}

export default function StatusBadge({ status }) {
  const { t } = useTranslation()
  const style = statusStyles[status]

  const label = style ? t(style.labelKey) : status
  const className = style?.className ?? 'bg-gray-100 text-gray-700'

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${className}`}>{label}</span>
  )
}