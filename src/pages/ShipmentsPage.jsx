import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ShipmentsFilters from '../components/ShipmentsFilters'
import ShipmentsDataTable from '../components/ShipmentsDataTable'

export default function ShipmentsPage({ shipments, onEdit, onDelete }) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const query = search.trim().toLowerCase()

  const filteredShipments = shipments.filter((shipment) => {
    const matchesStatus = status === 'all' || shipment.status === status

    const matchesSearch =
      shipment.id.toLowerCase().includes(query) ||
      shipment.driver.toLowerCase().includes(query) ||
      t(`people.${shipment.driver}`, { defaultValue: shipment.driver }).toLowerCase().includes(query) ||
      shipment.origin.toLowerCase().includes(query) ||
      t(`cities.${shipment.origin}`, { defaultValue: shipment.origin }).toLowerCase().includes(query) ||
      shipment.destination.toLowerCase().includes(query) ||
      t(`cities.${shipment.destination}`, { defaultValue: shipment.destination }).toLowerCase().includes(query)

    return matchesStatus && matchesSearch
  })

  if (shipments.length === 0) {
    return (
      <p
        role="status"
        className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500"
      >
        {t('table.noData')}
      </p>
    )
  }

  return (
    <>
      <ShipmentsFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />
      <ShipmentsDataTable
        shipments={filteredShipments}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  )
}