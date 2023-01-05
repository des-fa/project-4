import { useCallback, useEffect, useMemo, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, useMap, Rectangle, useMapEvent } from 'react-leaflet'
import { useEventHandlers } from '@react-leaflet/core'

const loveIcon = L.icon({
  iconUrl: '/images/search-heart.svg',
  iconRetinaUrl: '/images/search-heart.svg',
  iconAnchor: [5, 65],
  popupAnchor: [10, -44],
  iconSize: [35, 65]
})

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right'
}

const BOUNDS_STYLE = { weight: 1 }

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap()

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom())
    },
    [parentMap]
  )
  useMapEvent('click', onClick)

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds())
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds())
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom)
  }, [minimap, parentMap, zoom])

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
  useEventHandlers({ instance: parentMap }, handlers)

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}

function MinimapControl({ position, zoom }) {
  const parentMap = useMap()
  const mapZoom = zoom || 0

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    []
  )

  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
}

function ZoomMarker({ lat, long }) {
  const map = useMap()

  useEffect(() => {
    if (lat && long) {
      // console.log(lat + long)
      const location = { lat, lng: long }
      map.flyTo(location, 4)
    }
  }, [lat, long])

  return (lat && long) ? (
    <Marker
      position={[lat, long]}
      icon={loveIcon}
    >
      {/* <Popup>
        {searchTerm}
      </Popup> */}
    </Marker>
  ) : null
}

function HomeMap({ lat, long, searchTerm }) {
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
    <MapContainer className="home-map" center={[49.166972936611536, -123.11932391181658]} zoom={5} scrollWheelZoom>
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

      <MinimapControl position="topright" />

      <ZoomMarker lat={lat} long={long} searchTerm={searchTerm} />
    </MapContainer>
  )
}

export default HomeMap
