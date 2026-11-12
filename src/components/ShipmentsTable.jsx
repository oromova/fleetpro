import StatusBadge from './StatusBadge'

export default function ShipmentsTable({ shipments }) {

  if (shipments.length === 0) {
    return (
      <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500" role='status'>Yuk topilmadi</p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-3">ID</th>
            <th scope="col" className="px-4 py-3">Yo'nalish</th>
            <th scope="col" className="px-4 py-3">Haydovchi</th>
            <th scope="col" className="px-4 py-3">Status</th>
            <th scope="col" className="px-4 py-3">ETA</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="border-t border-slate-100">
              <td className="px-4 py-3">{shipment.id}</td>
              <td className="px-4 py-3">{shipment.origin} → {shipment.destination}</td>
              <td className="px-4 py-3">{shipment.driver}</td>
              <td className="px-4 py-3"><StatusBadge status={shipment.status} /></td>
              <td className="px-4 py-3">{shipment.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}