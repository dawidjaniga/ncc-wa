import React from 'react'

import useMapPageMediator from 'pages/map/mediator'
import GoogleMapReact from 'google-map-react'
import { useMapStore } from 'pages/map/store'
import styles from './MapStyles'
import Marker from 'components/Marker'
import ArticleModal from 'components/ArticleModal'

export default function GoogleMap () {
  const { mapComponentRendered, mapCenterChanged,  } = useMapPageMediator()
  const [{ markers, map }] = useMapStore()

  return (
    <>
      <ArticleModal />
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          libraries: ['places']
        }}
        defaultCenter={map.center}
        defaultZoom={map.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={mapComponentRendered}
        onChange={mapCenterChanged}
        options={{
          styles: styles.blueblack,
          minZoom: 10
        }}
      >
        {markers.map(marker => (
          <Marker
            title={marker.title}
            key={marker.lat + marker.lng + marker.title}
            lat={marker.lat}
            lng={marker.lng}
            url={marker.url}
            color={marker.color}
          ></Marker>
        ))}
      </GoogleMapReact>
    </>
  )
}
