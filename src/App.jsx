import KpiCard from './components/KpiCard'
import StatusBadge from './components/StatusBadge';
import { shipments } from './data/mockShipments'

const countByStatus = (status) =>
  shipments.filter((shipment) => shipment.status === status).length

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <main className="mx-auto max-w-6xl p-4">
        <h1 className="text-2xl font-bold text-slate-900">FleetPro</h1>

        <section aria-label="Asosiy ko'rsatkichlar" className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Jami yuklar" value={shipments.length} />
          <KpiCard title="Yo'lda" value={countByStatus('in_transit')} />
          <KpiCard title="Yetkazilgan" value={countByStatus('delivered')} />
          <KpiCard title="Kechikkan" value={countByStatus('delayed')} />
          <StatusBadge status="in_transit" />
        </section>
      </main>
    </div>
  )
}