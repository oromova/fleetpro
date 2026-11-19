import KpiCard from '../components/KpiCard'
import ShipmentsTable from '../components/ShipmentsTable'

export default function DashboardPage({ shipments }) {
  const countByStatus = (status) =>
    shipments.filter((shipment) => shipment.status === status).length

  return (
    <>
      <section aria-label="Asosiy ko'rsatkichlar" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Jami yuklar" value={shipments.length} />
        <KpiCard title="Yo'lda" value={countByStatus('in_transit')} />
        <KpiCard title="Yetkazilgan" value={countByStatus('delivered')} />
        <KpiCard title="Kechikkan" value={countByStatus('delayed')} />
      </section>

      <section aria-labelledby="recent-title" className="space-y-3">
        <h2 id="recent-title" className="text-lg font-semibold text-slate-900">So'nggi yuklar</h2>
        <ShipmentsTable shipments={shipments.slice(0, 5)} />
      </section>
    </>
  )
}