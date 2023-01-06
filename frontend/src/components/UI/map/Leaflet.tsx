import { Map } from 'leaflet'
import React from 'react'
import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet'

type Props = MapContainerProps & { ref: React.RefObject<Map> }

const Leaflet = React.forwardRef<Map, Props>((props: Props, ref) => {
  return (
    <MapContainer {...props} ref={ref}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.children}
    </MapContainer>
  )
})

export { Leaflet }
