import StatusBadge from './StatusBadge'
import { useTranslation } from 'react-i18next'

export default function ShipmentsTable({ shipments }) {
  const { t } = useTranslation()
  
  if (shipments.length === 0) {

    return (
      <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500" role='status'>{t('table.empty')}</p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-3">{t('table.id')}</th>
            <th scope="col" className="px-4 py-3">{t('table.route')}</th>
            <th scope="col" className="px-4 py-3">{t('table.driver')}</th>
            <th scope="col" className="px-4 py-3">{t('table.status')}</th>
            <th scope="col" className="px-4 py-3">{t('table.eta')}</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="border-t border-slate-100">
              <td className="px-4 py-3">{shipment.id}</td>
              <td className="px-4 py-3">
                {t(`cities.${shipment.origin}`, { defaultValue: shipment.origin })} →{' '}
                {t(`cities.${shipment.destination}`, { defaultValue: shipment.destination })}
              </td>
              <td className="px-4 py-3">{t(`people.${shipment.driver}`, { defaultValue: shipment.driver })}</td>
              <td className="px-4 py-3"><StatusBadge status={shipment.status} /></td>
              <td className="px-4 py-3">{shipment.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}