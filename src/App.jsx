import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { connectShipmentSocket } from './api/fakeSocket'
import { fetchShipments, createShipment, updateShipment, deleteShipment } from './api/shipments'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import NewShipmentModal from './components/NewShipmentModal'
import ConfirmDialog from './components/ConfirmDialog'
import DashboardPage from './pages/DashboardPage'
import ShipmentsPage from './pages/ShipmentsPage'
import MapPage from './pages/MapPage'
import DriversPage from './pages/DriversPage'

export default function App() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingShipment, setEditingShipment] = useState(null)
  const [shipmentToDelete, setShipmentToDelete] = useState(null)

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

  const updateMutation = useMutation({
    mutationFn: updateShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      setEditingShipment(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      setShipmentToDelete(null)
    },
  })

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingShipment(null)
  }

  const handleSubmit = (form) => {
    if (editingShipment) {
      updateMutation.mutate({ id: editingShipment.id, changes: form })
    } else {
      addShipment.mutate(form)
    }
  }

  useEffect(() => {
    const disconnect = connectShipmentSocket((message) => {
      queryClient.setQueryData(['shipments'], (old) =>
        old?.map((shipment) =>
          shipment.id === message.shipment.id ? message.shipment : shipment,
        ),
      )
    })

    return disconnect
  }, [queryClient])

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onNewClick={() => setIsModalOpen(true)}
        />

        <main className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-8">
          {isPending && (
            <p role="status" className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              {t('common.loading')}
            </p>
          )}

          {isError && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">
              {t('common.error')}
            </p>
          )}

          {!isPending && !isError && (
            <Routes>
              <Route path="/" element={<DashboardPage shipments={shipments} />} />
              <Route
                path="/shipments"
                element={
                  <ShipmentsPage
                    shipments={shipments}
                    onEdit={setEditingShipment}
                    onDelete={setShipmentToDelete}
                  />
                }
              />
              <Route path="/map" element={<MapPage shipments={shipments} />} />
              <Route path="/drivers" element={<DriversPage />} />
            </Routes>
          )}
        </main>

        {(isModalOpen || editingShipment) && (
          <NewShipmentModal
            key={editingShipment?.id ?? 'new'}
            shipment={editingShipment}
            onClose={closeModal}
            onSubmit={handleSubmit}
            isSaving={addShipment.isPending || updateMutation.isPending}
          />
        )}

        {shipmentToDelete && (
          <ConfirmDialog
            title={t('confirm.deleteTitle')}
            message={t('confirm.deleteMessage', { id: shipmentToDelete.id })}
            confirmLabel={t('actions.delete')}
            isBusy={deleteMutation.isPending}
            onCancel={() => setShipmentToDelete(null)}
            onConfirm={() => deleteMutation.mutate(shipmentToDelete.id)}
          />
        )}
      </div>
    </div>
  )
}