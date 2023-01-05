import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, Marker, Polygon, Popup, Rectangle, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useEventHandlers } from '@react-leaflet/core'

const capitalIcon = L.icon({
  iconUrl: '/images/capital-star.png',
  iconRetinaUrl: '/images/capital-star.png',
  iconAnchor: [5, 25],
  popupAnchor: [10, -44],
  iconSize: [25, 25]
})

const cityIcon = L.icon({
  iconUrl: '/images/city-location.png',
  iconRetinaUrl: '/images/city-location.png',
  iconAnchor: [5, 25],
  popupAnchor: [10, -44],
  iconSize: [25, 25]
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

function CapitalMarker({ capitalCoordinates }) {
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

function CityMarker({ cityCoordinates }) {
  const map = useMap()
  const popupRef = useRef(null)

  useEffect(() => {
    if (cityCoordinates) {
      if (popupRef.current) {
        popupRef.current.close()
      }
      const location = { lat: cityCoordinates?.lat, lng: cityCoordinates?.long }
      map.setView(location, 4)
    }
  }, [cityCoordinates])

  return (
    cityCoordinates
    && (
    <Marker
      eventHandlers={{
        click: () => {
          map.setView(
            [cityCoordinates?.lat, cityCoordinates?.long],
            12
          )
        }
      }}
      position={[cityCoordinates?.lat, cityCoordinates?.long]}
      icon={cityIcon}
    >
      <Popup ref={popupRef}>
        <p className="p-1">{cityCoordinates?.name}</p>
      </Popup>
    </Marker>
    )
  )
}

function CityMap({ countryPolygonCoordinates, lat, long, capitalCoordinates, cityCoordinates }) {
  const [polygonCoordinates, setPolygonCoordinates] = useState(null)

  // console.log('polygon', countryPolygonCoordinates)

  useEffect(() => {
    if (countryPolygonCoordinates?.length > 1) {
      countryPolygonCoordinates?.map((data) => (
        data?.map((coord) => (
          setPolygonCoordinates(coord)
        ))
      ))
      // console.log('polycoords', polygonCoordinates)
      // console.log('polycoordslength', polygonCoordinates)
    } else {
      countryPolygonCoordinates?.map((data) => (
        setPolygonCoordinates(data)

      ))
      // console.log('polycoords', polygonCoordinates)
    }
  }, [])

  return (
    <MapContainer className="home-map" style={{ height: 350 }} center={[lat, long]} zoom={3} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MinimapControl position="topright" />

      <CapitalMarker capitalCoordinates={capitalCoordinates} />

      {
        Object.keys(cityCoordinates).length > 0 ? (
          <CityMarker cityCoordinates={cityCoordinates} />
        ) : (
          null
        )
      }

      {
        polygonCoordinates?.length > 0 ? (
          <Polygon color="purple" positions={polygonCoordinates} />
        ) : (
          null
        )
      }
    </MapContainer>
  )
}

export default CityMap
