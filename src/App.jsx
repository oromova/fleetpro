import { useState } from 'react';
import KpiCard from './components/KpiCard'
import ShipmentsTable from './components/ShipmentsTable';
import { shipments } from './data/mockShipments'
import Header from './components/Header'
import Sidebar from './components/Sidebar';

const countByStatus = (status) =>
  shipments.filter((shipment) => shipment.status === status).length

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
      
      <div className='flex min-w-0 flex-1 flex-col'>
        <Header onMenuClick={() => setSidebarOpen(true)}/>

        <main className="mx-auto w-full space-y-6 p-4 md:p-8 max-w-6xl p-4">
          <section aria-label="Asosiy ko'rsatkichlar" className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="Jami yuklar" value={shipments.length} />
            <KpiCard title="Yo'lda" value={countByStatus('in_transit')} />
            <KpiCard title="Yetkazilgan" value={countByStatus('delivered')} />
            <KpiCard title="Kechikkan" value={countByStatus('delayed')} />
          </section>

          <section className="mt-6">
            <ShipmentsTable shipments={shipments} />
          </section>
        </main>
      </div>
      
    </div>
  )
}