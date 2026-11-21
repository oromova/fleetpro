import { advanceRandomShipment } from './shipments'

export function connectShipmentSocket(onMessage) {
  const intervalId = setInterval(() => {
    const updated = advanceRandomShipment()
    if (updated) {
      onMessage({ type: 'shipment_updated', shipment: updated })
    }
  }, 5000)

  return () => clearInterval(intervalId)
}