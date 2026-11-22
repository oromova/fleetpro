import { shipments as initialShipments } from '../data/mockShipments'

const STORAGE_KEY = 'fleetpro-shipments'

const load = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : [...initialShipments]
  } catch {
    return [...initialShipments]
  }
}

const save = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // saqlab bo'lmasa, ilova baribir ishlayveradi
  }
}

let db = load()

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchShipments() {
  await delay(800)
  return [...db]
}

export async function createShipment(form) {
  await delay(500)
  const newShipment = {
    id: `FP-${1001 + db.length}`,
    ...form,
    status: 'pending',
  }
  db = [newShipment, ...db]
  save(db)
  return newShipment
}

const NEXT_STATUS = { pending: 'in_transit', in_transit: 'delivered' }

export function advanceRandomShipment() {
  const movable = db.filter((shipment) => NEXT_STATUS[shipment.status])
  if (movable.length === 0) return null

  const target = movable[Math.floor(Math.random() * movable.length)]
  const updated = { ...target, status: NEXT_STATUS[target.status] }

  db = db.map((shipment) => (shipment.id === updated.id ? updated : shipment))
  save(db)
  return updated
}