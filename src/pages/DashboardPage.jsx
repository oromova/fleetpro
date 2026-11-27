import KpiCard from '../components/KpiCard'
import ShipmentsTable from '../components/ShipmentsTable'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function DashboardPage({ shipments }) {
  const { t } = useTranslation()

  const countByStatus = (status) =>
    shipments.filter((shipment) => shipment.status === status).length

  return (
    <>
      <section aria-label={t('dashboard.kpiLabel')} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title={t('dashboard.totalShipments')} value={shipments.length} />
        <KpiCard title={t('dashboard.inTransit')} value={countByStatus('in_transit')} />
        <KpiCard title={t('dashboard.delivered')} value={countByStatus('delivered')} />
        <KpiCard title={t('dashboard.delayed')} value={countByStatus('delayed')} />
      </section>

      <section aria-labelledby="recent-title" className="space-y-3">
        <div>
          <h2 id="recent-title" className="text-lg font-semibold text-slate-900">{t('dashboard.recentTitle')}</h2>
          <ShipmentsTable shipments={shipments.slice(0, 5)} />
          {shipments.length > 5 && (
            <Link
              to="/shipments"
              className="text-sm font-medium text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {t('dashboard.viewAll')}
            </Link>
          )}
        </div>
      </section>
    </>
  )
}