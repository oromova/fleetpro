import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchShipments, createShipment } from './api/shipments'
import Header from './components/Header'
import Sidebar from './components/Sidebar';
import NewShipmentModal from './components/NewShipmentModal';
import DashboardPage from './pages/DashboardPage'
import ShipmentsPage from './pages/ShipmentsPage'
import MapPage from './pages/MapPage';
import DriversPage from './pages/DriversPage'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const { data: shipments = [], isPending, isError } = useQuery({
    queryKey: ['shipments'],
    queryFn: fetchShipments,
  })

  const addShipment = useMutation({
    mutationFn: createShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      setIsModalOpen(false)
    },
  })

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
      
      <div className='flex min-w-0 flex-1 flex-col'>
        <Header onMenuClick={() => setSidebarOpen(true)} onNewClick={() => setIsModalOpen(true)}/>

        <main className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-8">
          {isPending && (
            <p role="status" className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">Yuklanmoqda...</p>
          )}

          {isError && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">Ma'lumotni yuklab bo'lmadi</p>
          )}

          {!isPending && !isError && (
            <Routes>
              <Route path="/" element={<DashboardPage shipments={shipments} />} />
              <Route path="/shipments" element={<ShipmentsPage shipments={shipments} />} />
              <Route path="/map" element={<MapPage shipments={shipments} />} />
              <Route path="/drivers" element={<DriversPage />} />
            </Routes>
          )}         
        </main>

        {isModalOpen && (
          <NewShipmentModal onClose={() => setIsModalOpen(false)} onSubmit={(form) => addShipment.mutate(form)} isSaving={addShipment.isPending}/>
        )}
      </div>
    </div>
  )
}