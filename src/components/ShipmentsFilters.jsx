const statusOptions = [
  {value: "all", title: "Hammasi"},
  {value: "in_transit", title: "Yo'lda"},
  {value: "delivered", title: "Yetkazilgan"},
  {value: "delayed", title: "Kechikkan"},
  {value: "pending", title: "Kutilmoqda"},
]
export default function ShipmentsFilters({ search, onSearchChanges, status, onStatusChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input className="w-full rounded-lg border border-slate-200 bg-white outline-none px-3 py-2 text-sm sm:max-w-xs" type="search" aria-label="Yuklarni qidirish" placeholder="ID, shahar yoki haydovchi..." value={search} onChange={(event) => onSearchChanges(event.target.value)}/>
      <select className="w-full rounded-lg border border-slate-200 outline-none bg-white px-3 py-2 text-sm" 
      onChange={(event) => onStatusChange(event.target.value)} 
      aria-label="Status bo'yicha filtr" 
      value={status} 
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.title}</option>
        ))}
      </select>
    </div>
  )
}