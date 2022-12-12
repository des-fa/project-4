import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
// import countriesData from '../../data/countries.json'
// import heart from '/images/heart.svg'

const loveIcon = L.icon({
  iconUrl: '/images/search-heart.svg',
  iconRetinaUrl: '/images/search-heart.svg',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55]
})

function Map({ lat, long }) {
  // function LocationMarker() {
  //   const map = useMapEvents({
  //     click: (e) => {
  //       const { lat, lng } = e.latlng
  //       console.log(lat, lng)
  //     }
  //   })
  //   return null
  // }

  // {/* <LocationMarker>
  //       {(map) => {
  //         map.on('click', (e) => {
  //           const { lat, lng } = e.latlng
  //           { /* console.log(lat, lng) */ }
  //         })
  //         return null
  //       }}
  //     </LocationMarker> */}

  return (
    <MapContainer className="home-map" center={[49.166972936611536, -123.11932391181658]} zoom={8} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* {countriesData.map((country) => (
        <Marker
          key={country.id}
          position={[country.latitude, country.longitude]}
          icon={loveIcon}
        />
      ))} */}
      <Marker
        position={[lat, long]}
        icon={loveIcon}
      />
    </MapContainer>
  )
}

export default Map
