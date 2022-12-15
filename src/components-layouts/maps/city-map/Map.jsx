import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

const capitalIcon = L.icon({
  iconUrl: '/images/capital-star.png',
  iconRetinaUrl: '/images/capital-star.png',
  iconAnchor: [5, 25],
  popupAnchor: [10, -44],
  iconSize: [25, 25]
})

function Markers({ capitalInfo }) {
  const map = useMap()
  return (
    capitalInfo.length > 0
    && capitalInfo.map((info, i) => (
      <Marker
        eventHandlers={{
          click: () => {
            map.setView(
              [info.lat, info.long],
              12
            )
          }
        }}
        key={i}
        position={[info.lat, info.long]}
        icon={capitalIcon}
      >
        <Popup>
          <h5 className="py-2">{info.name}</h5>
        </Popup>
      </Marker>
    ))
  )
}

function CityMap({ lat, long, capitalInfo }) {
  return (
    <MapContainer className="home-map" style={{ height: 350 }} center={[lat, long]} zoom={3} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Markers capitalInfo={capitalInfo} />

    </MapContainer>
  )
}

export default CityMap
