import { useState } from 'react'

const emptyForm = { origin: '', destination: '', driver: '', eta: '' }

export default function NewShipmentModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="new-shipment-title" className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 id="new-shipment-title" className="text-lg font-bold text-slate-900">Yangi yuk</h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="origin">Qayerdan</label>
            <input id="origin" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden" name="origin" value={form.origin} onChange={handleChange}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="destination">Qayerga</label>
            <input id="destination" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden" name="destination" value={form.destination} onChange={handleChange}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="driver">Haydovchi</label>
            <input id="driver" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden" name="driver" value={form.driver} onChange={handleChange}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="eta">Yetkazish sanasi</label>
            <input id="eta" type="date" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden" name="eta" value={form.eta} onChange={handleChange}/>
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