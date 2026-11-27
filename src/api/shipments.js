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

const nextId = () => {
  const max = db.reduce(
    (m, shipment) => Math.max(m, Number(shipment.id.replace('FP-', ''))),
    1000,
  )
  return `FP-${max + 1}`
}

export async function fetchShipments() {
  await delay(800)
  return [...db]
}

export async function createShipment(form) {
  await delay(500)
  const newShipment = {
    id: nextId(),
    ...form,
    status: 'pending',
  }
  db = [newShipment, ...db]
  save(db)
  return newShipment
}

export async function updateShipment({ id, changes }) {
  await delay(500)
  db = db.map((shipment) => (shipment.id === id ? { ...shipment, ...changes } : shipment))
  save(db)
  return db.find((shipment) => shipment.id === id)
}

export async function deleteShipment(id) {
  await delay(500)
  db = db.filter((shipment) => shipment.id !== id)
  save(db)
  return id
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