import { useQuery } from '@tanstack/react-query'
import { fetchDrivers } from '../api/drivers'
import { fetchShipments } from '../api/shipments'
import { useTranslation } from 'react-i18next'

const statusStyles = {
  available: { labelKey: 'drivers.available', className: 'bg-green-100 text-green-700' },
  on_route: { labelKey: 'drivers.on_route', className: 'bg-blue-100 text-blue-700' },
  off_duty: { labelKey: 'drivers.off_duty', className: 'bg-gray-100 text-gray-700' },
}

export default function DriversPage() {
  const { t } = useTranslation()
  const drivers = useQuery({ queryKey: ['drivers'], queryFn: fetchDrivers })
  const shipments = useQuery({ queryKey: ['shipments'], queryFn: fetchShipments })

  if (drivers.isPending || shipments.isPending) {
    return <p role="status" className="p-8 text-center text-sm text-slate-500">{t('common.loading')}</p>
  }

  if (drivers.isError || shipments.isError) {
    return <p role="alert" className="p-8 text-center text-sm text-red-700">{t('common.error')}</p>
  }

  const activeCount = (driverName) =>
    shipments.data.filter(
      (shipment) => shipment.driver === driverName && shipment.status === 'in_transit',
    ).length

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {drivers.data.map((driver) => {
        const style = statusStyles[driver.status]
        const label = style ? t(style.labelKey) : driver.status
        const className = style?.className ?? 'bg-gray-100 text-gray-700'

        return (
          <li key={driver.id}>
            <div className="flex h-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-slate-900">{t(`people.${driver.name}`, { defaultValue: driver.name })}</h3>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${className}`}>{label}</span>
              </div>

              <div className="space-y-1 text-sm text-slate-500">
                <p>
                  <a href={`tel:${driver.phone.replaceAll(' ', '')}`} className="hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{driver.phone}</a>
                </p>
                <p>{driver.truck}</p>
              </div>

              <p className="mt-auto text-sm text-slate-700">
                {t('drivers.activeShipments')}: <strong>{activeCount(driver.name)}</strong>
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}