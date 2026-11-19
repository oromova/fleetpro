const statusStyles = {
  delivered: { label: 'Yetkazilgan', className: 'bg-green-100 text-green-700' },
  in_transit: { label: "Yo'lda", className: "bg-blue-100 text-blue-700"},
  delayed: { label: "Kechikkan", className: "bg-red-100 text-red-700"},
  pending: { label: "Kutilmoqda", className: "bg-gray-100 text-gray-700"}
}

export default function StatusBadge({ status }) {
  const style = statusStyles[status]

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${style.className}`}>
      {style.label}
    </span>
  )
}

