import { shipments as initialShipments } from '../data/mockShipments'

let db = [...initialShipments]

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
  return newShipment
}