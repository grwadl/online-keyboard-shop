import { useAppSelector } from '@/redux/common/hooks'
import { Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Leaflet } from './Leaflet'

function MapLeaflet() {
  const mapRef = useRef<Map>(null)
  const { activePostOffice, activeCity } = useAppSelector(({ post }) => post)

  useEffect(() => {
    if (!activeCity?.Latitude || !activeCity?.Longitude) return
    mapRef.current?.setView([+activeCity?.Latitude, +activeCity?.Longitude], 13)
  }, [activeCity?.Latitude, activeCity?.Longitude])

  useEffect(() => {
    if (!activePostOffice?.Latitude || !activePostOffice?.Longitude) return
    mapRef.current?.setView([+activePostOffice?.Latitude, +activePostOffice?.Longitude], 16)
  }, [activePostOffice?.Latitude, activePostOffice?.Longitude])

  const displayMap = useMemo(
    () => (
      <Leaflet
        style={{ width: '100%', zIndex: '0', height: '100vh' }}
        zoom={13}
        ref={mapRef}
        center={[49, 32]}
        scrollWheelZoom={false}
        fadeAnimation={true}
        markerZoomAnimation={true}
      >
        {activePostOffice?.Latitude && activePostOffice.Longitude && (
          <Marker position={[+activePostOffice?.Latitude, +activePostOffice?.Longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
      </Leaflet>
    ),
    [activePostOffice?.Latitude, activePostOffice?.Longitude]
  )

  return (
    <div className="map w-full max-h-60 sm:max-h-[400px] md:max-h-[600px] lg:max-h-96 xl:max-h-[600px] relative z-1 overflow-hidden cursor-pointer">
      {displayMap}
    </div>
  )
}

export default MapLeaflet
