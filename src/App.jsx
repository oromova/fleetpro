import { useState } from 'react';
import { shipments as initialShipments } from './data/mockShipments'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar';
import NewShipmentModal from './components/NewShipmentModal';
import DashboardPage from './pages/DashboardPage'
import ShipmentsPage from './pages/ShipmentsPage'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shipments, setShipments] = useState(initialShipments)

  const handleAddShipment = (form) => {
    const newShipment = {
      id: `FP-${1001 + shipments.length}`,
      ...form,
      status: 'pending',
    }
    setShipments([newShipment, ...shipments])
    setIsModalOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
      
      <div className='flex min-w-0 flex-1 flex-col'>
        <Header onMenuClick={() => setSidebarOpen(true)} onNewClick={() => setIsModalOpen(true)}/>

        <main className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<DashboardPage shipments={shipments} />} />
            <Route path="/shipments" element={<ShipmentsPage shipments={shipments} />} />
          </Routes>          
        </main>

        {isModalOpen && (
          <NewShipmentModal onClose={() => setIsModalOpen(false)} onSubmit={handleAddShipment}/>
        )}
      </div>
    </div>
  )
}