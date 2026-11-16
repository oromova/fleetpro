import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

  const shipmentSchema = z
    .object({
      origin: z.string().trim().min(1, "Jo'natish shaharini kiriting"),
      destination: z.string().trim().min(1, 'Yetkazish shaharini kiriting'),
      driver: z.string().trim().min(1, 'Haydovchi ismini kiriting'),
      eta: z.string().min(1, 'Sanani tanlang'),
    })
    .refine((data) => data.origin.toLowerCase() !== data.destination.toLowerCase(), {
      message: "Shaharlar bir xil bo'lmasligi kerak",
      path: ['destination'],
    })

  const inputClass = (hasError) =>
  `mt-1 w-full rounded-lg border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${
    hasError
      ? 'border-red-500 focus-visible:outline-red-600'
      : 'border-slate-200 focus-visible:outline-blue-600'
  }`

export default function NewShipmentModal({ onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shipmentSchema),
    defaultValues: { origin: '', destination: '', driver: '', eta: '' },
  })

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="new-shipment-title" className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 id="new-shipment-title" className="text-lg font-bold text-slate-900">Yangi yuk</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="origin">Qayerdan</label>
            <input
              id="origin"
              className={inputClass(errors.origin)}
              aria-invalid={errors.origin ? 'true' : 'false'}
              aria-describedby={errors.origin ? 'origin-error' : undefined}
              {...register('origin')}
            />
            {errors.origin && (
              <p id="origin-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.origin.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="destination">Qayerga</label>
            <input
              id="destination"
              className={inputClass(errors.destination)}
              aria-invalid={errors.destination ? 'true' : 'false'}
              aria-describedby={errors.destination ? 'destination-error' : undefined}
              {...register('destination')}
            />
            {errors.destination && (
              <p id="destination-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.destination.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="driver">Haydovchi</label>
            <input
              id="driver"
              className={inputClass(errors.driver)}
              aria-invalid={errors.driver ? 'true' : 'false'}
              aria-describedby={errors.driver ? 'driver-error' : undefined}
              {...register('driver')}
            />
            {errors.driver && (
              <p id="driver-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.driver.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="eta">Yetkazish sanasi</label>
            <input
              id="eta"
              type="date"
              className={inputClass(errors.eta)}
              aria-invalid={errors.eta ? 'true' : 'false'}
              aria-describedby={errors.eta ? 'eta-error' : undefined}
              {...register('eta')}
            />
            {errors.eta && (
              <p id="eta-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.eta.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Bekor qilish
            </button>
            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}