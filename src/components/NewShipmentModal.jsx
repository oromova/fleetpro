import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cities } from '../data/cities'
import { useTranslation } from 'react-i18next'

const cityNames = Object.keys(cities)

const shipmentSchema = z
  .object({
    origin: z.string().min(1, 'errors.originRequired'),
    destination: z.string().min(1, 'errors.destinationRequired'),
    driver: z.string().trim().min(1, 'errors.driverRequired'),
    eta: z.string().min(1, 'errors.etaRequired'),
  })
  .refine((data) => data.origin.toLowerCase() !== data.destination.toLowerCase(), {
    message: 'errors.sameCity',
    path: ['destination'],
  })

  const inputClass = (hasError) =>
  `mt-1 w-full rounded-lg border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${
    hasError
      ? 'border-red-500 focus-visible:outline-red-600'
      : 'border-slate-200 focus-visible:outline-blue-600'
  }`

export default function NewShipmentModal({ onClose, onSubmit, isSaving }) {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shipmentSchema),
    defaultValues: { origin: '', destination: '', driver: '', eta: '' },
  })

  const cityOptions = cityNames.map((city) => (
    <option key={city} value={city}>
      {t(`cities.${city}`, { defaultValue: city })}
    </option>
  ))

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="new-shipment-title" className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 id="new-shipment-title" className="text-lg font-bold text-slate-900">{t('modal.title')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="origin">{t('modal.origin')}{t('modal.origin')}</label>
            <select id="origin" className={inputClass(errors.origin)} aria-invalid={errors.origin ? 'true' : 'false'} aria-describedby={errors.origin ? 'origin-error' : undefined} {...register('origin')}>
              <option value="">{t('modal.choose')}</option>
              {cityOptions}
            </select>
            {errors.origin && (
              <p id="origin-error" role="alert" className="mt-1 text-sm text-red-600">
                {t(errors.origin.message)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="destination">{t('modal.destination')}</label>
            <select id="destination" className={inputClass(errors.destination)} aria-invalid={errors.destination ? 'true' : 'false'} aria-describedby={errors.destination ? 'destination-error' : undefined} {...register('destination')}>
              <option value="">{t('modal.choose')}</option>
              {cityOptions}
            </select>
            {errors.destination && (
              <p id="destination-error" role="alert" className="mt-1 text-sm text-red-600">
                {t(errors.destination.message)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="driver">{t('modal.driver')}</label>
            <input id="driver" className={inputClass(errors.driver)} aria-invalid={errors.driver ? 'true' : 'false'} aria-describedby={errors.driver ? 'driver-error' : undefined}{...register('driver')}/>
            {errors.driver && (
              <p id="driver-error" role="alert" className="mt-1 text-sm text-red-600">{t(errors.driver.message)}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="eta">{t('modal.eta')}</label>
            <input id="eta" type="date" className={inputClass(errors.eta)} aria-invalid={errors.eta ? 'true' : 'false'} aria-describedby={errors.eta ? 'eta-error' : undefined}{...register('eta')}/>
            {errors.eta && (
              <p id="eta-error" role="alert" className="mt-1 text-sm text-red-600">{t(errors.eta.message)}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} disabled={isSaving} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60">{t('modal.cancel')}</button>
            <button type="submit" disabled={isSaving} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? t('modal.saving') : t('modal.save')}</button>
          </div>
        </form>
      </div>
    </div>
  )
}