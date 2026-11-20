import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { cities } from '../data/cities'

export default function MapPage({ shipments }) {
  const activeRoutes = shipments.filter(
    (shipment) =>
      shipment.status === 'in_transit' &&
      cities[shipment.origin] &&
      cities[shipment.destination],
  )

  return (
    <div className="h-[70vh] overflow-hidden rounded-xl border border-slate-200">
      <MapContainer center={[41.0, 64.5]} zoom={6} className="h-full w-full">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {activeRoutes.map((shipment) => (
          <Polyline key={shipment.id} positions={[cities[shipment.origin], cities[shipment.destination]]} pathOptions={{ color: '#1D4ED8', weight: 3, dashArray: '6 8' }}>
            <Tooltip sticky>{shipment.id}: {shipment.origin} → {shipment.destination}</Tooltip>
          </Polyline>
        ))}

        {Object.entries(cities).map(([name, position]) => {
          const count = shipments.filter((shipment) => shipment.origin === name).length

          return (
            <CircleMarker key={name} center={position} radius={8} pathOptions={{ color: '#2563EB', fillColor: '#2563EB', fillOpacity: 0.8 }}>
              <Tooltip>{name}: {count} ta yuk</Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}