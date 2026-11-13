import { useState } from 'react'

const emptyForm = { origin: '', destination: '', driver: '', eta: '' }

export default function NewShipmentModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    onSubmit(form)
  }

  const validate = (form) => {
    const errors = {}

    if (!form.origin.trim()) errors.origin = 'Jo\'natish shaharini kiriting'
    if (!form.destination.trim()) errors.destination = 'Yetkazish shaharini kiriting'
    if (!form.driver.trim()) errors.driver = 'Haydovchi ismini kiriting'
    if (!form.eta) errors.eta = 'Sanani tanlang'

    if (
      form.origin.trim() &&
      form.origin.trim().toLowerCase() === form.destination.trim().toLowerCase()
    ) {
      errors.destination = 'Shaharlar bir xil bo\'lmasligi kerak'
    }

    return errors
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="new-shipment-title" className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 id="new-shipment-title" className="text-lg font-bold text-slate-900">Yangi yuk</h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="origin">Qayerdan</label>
            <input id="origin" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden" name="origin" value={form.origin} onChange={handleChange} aria-invalid={errors.origin ? 'true' : 'false'} aria-describedby={errors.origin ? 'origin-error' : undefined}/>
            {errors.origin && (
              <p id="origin-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.origin}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="destination">Qayerga</label>
            <input id="destination" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden" name="destination" value={form.destination} onChange={handleChange} aria-invalid={errors.destination ? 'true' : 'false'} aria-describedby={errors.destination ? 'destination-error' : undefined}/>
            {errors.destination && (
              <p id="destination-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.destination}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="driver">Haydovchi</label>
            <input id="driver" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-slate-200" name="driver" value={form.driver} onChange={handleChange} aria-invalid={errors.driver ? 'true' : 'false'} aria-describedby={errors.driver ? 'driver-error' : undefined}/>
            {errors.driver && (
              <p id="driver-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.driver}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="eta">Yetkazish sanasi</label>
            <input id="eta" type="date" name="eta" value={form.eta} onChange={handleChange} aria-invalid={errors.eta ? 'true' : 'false'} aria-describedby={errors.eta ? 'eta-error' : undefined} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"/>
            {errors.eta && (
              <p id="eta-error" role="alert" className="mt-1 text-sm text-red-600">{errors.eta}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Bekor qilish</button>
            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Saqlash</button>
          </div>
        </form>
      </div>
    </div>
  )
}