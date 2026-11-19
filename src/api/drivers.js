import { drivers } from '../data/mockDrivers'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchDrivers() {
  await delay(600)
  return [...drivers]
}