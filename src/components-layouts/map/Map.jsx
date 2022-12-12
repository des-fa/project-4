import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import countriesData from '../../data/countries.json'

function Map() {
  return (
    <MapContainer className="home-map" center={[49.166972936611536, -123.11932391181658]} zoom={8} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {countriesData.map((country) => (
        <Marker
          key={country.id}
          position={[country.latitude, country.longitude]}
        />
      ))}
    </MapContainer>
  )
}

export default Map
