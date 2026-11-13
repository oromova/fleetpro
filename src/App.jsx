import { useState } from 'react';
import KpiCard from './components/KpiCard'
import ShipmentsTable from './components/ShipmentsTable';
import { shipments } from './data/mockShipments'
import Header from './components/Header'
import Sidebar from './components/Sidebar';
import ShipmentsFilters from './components/ShipmentsFilters';
import { shipments as initialShipments} from './data/mockShipments'
import NewShipmentModal from './components/NewShipmentModal';

const countByStatus = (status) =>
  shipments.filter((shipment) => shipment.status === status).length

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const [shipments, setShipments] = useState(initialShipments)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const countByStatus = (status) =>
    shipments.filter((shipment) => shipment.status === status).length

    const handleAddShipment = (form) => {
    const newShipment = {
      id: `FP-${1001 + shipments.length}`,
      ...form,
      status: 'pending',
    }
    setShipments([newShipment, ...shipments])
    setIsModalOpen(false)
  }

  const query = search.trim().toLowerCase()

  const filteredShipments = shipments.filter((shipment) => {
    const matchesStatus = status === 'all' || shipment.status === status

    const matchesSearch = 
      shipment.driver.toLowerCase().includes(query) || 
      shipment.id.toLowerCase().includes(query) ||
      shipment.origin.toLowerCase().includes(query) ||
      shipment.destination.toLowerCase().includes(query)
    
    return matchesStatus && matchesSearch
  })

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
      
      <div className='flex min-w-0 flex-1 flex-col'>
        <Header onMenuClick={() => setSidebarOpen(true)}  onNewClick={() => setIsModalOpen(true)}/>

        <main className="mx-auto w-full space-y-6 p-4 md:p-8 max-w-6xl p-4">
          <section aria-label="Asosiy ko'rsatkichlar" className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="Jami yuklar" value={shipments.length} />
            <KpiCard title="Yo'lda" value={countByStatus('in_transit')} />
            <KpiCard title="Yetkazilgan" value={countByStatus('delivered')} />
            <KpiCard title="Kechikkan" value={countByStatus('delayed')} />
          </section>

          <ShipmentsFilters search={search} onSearchChanges={setSearch} status={status} onStatusChange={setStatus}/>

          <section className="mt-6">
            <ShipmentsTable shipments={filteredShipments} />
          </section>
          
        </main>

        {isModalOpen && (
          <NewShipmentModal onClose={() => setIsModalOpen(false)} onSubmit={handleAddShipment}/>
        )}
      </div>
      
    </div>
  )
}