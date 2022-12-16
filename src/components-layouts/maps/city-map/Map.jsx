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

function Markers({ capitalCoordinates }) {
  const map = useMap()
  return (
    capitalCoordinates?.length > 0
    && capitalCoordinates?.map((info, i) => (
      <Marker
        eventHandlers={{
          click: () => {
            map.setView(
              [info?.lat, info?.long],
              12
            )
          }
        }}
        key={i}
        position={[info?.lat, info?.long]}
        icon={capitalIcon}
      >
        <Popup>
          <p className="p-1">{info?.name}</p>
        </Popup>
      </Marker>
    ))
  )
}

function CityMap({ lat, long, capitalCoordinates }) {
  // console.log(capitalCoordinates)
  return (
    <MapContainer className="home-map" style={{ height: 350 }} center={[lat, long]} zoom={3} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Markers capitalCoordinates={capitalCoordinates} />

    </MapContainer>
  )
}

export default CityMap
