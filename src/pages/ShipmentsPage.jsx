import { useState } from 'react'
import ShipmentsFilters from '../components/ShipmentsFilters'
import ShipmentsDataTable from '../components/ShipmentsDataTable'

export default function ShipmentsPage({ shipments }) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

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
    <>
      <ShipmentsFilters search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus}/>
      <ShipmentsDataTable shipments={filteredShipments} />
    </>
  )
}