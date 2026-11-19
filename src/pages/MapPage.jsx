import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { cities } from '../data/cities'

export default function MapPage() {
  return (
    <div className="h-[70vh] overflow-hidden rounded-xl border border-slate-200">
      <MapContainer center={[41.0, 64.5]} zoom={6} className="h-full w-full">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {Object.entries(cities).map(([name, position]) => (
          <CircleMarker key={name} center={position} radius={8} pathOptions={{ color: '#2563EB', fillColor: '#2563EB', fillOpacity: 0.8 }}>
            <Tooltip>{name}</Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}