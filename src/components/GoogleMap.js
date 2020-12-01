import React from 'react'

import useMapPageMediator from 'pages/map/mediator'
import GoogleMapReact from 'google-map-react'
import { useCurrentMarkerStore, useMapStore } from 'pages/map/store'
import styles from './MapStyles'
import { Modal } from 'antd'
import Marker from './Marker'

function ArticleModal() {
  const [{ visible }] = useMapStore()
  const [state, { closeModal}] = useCurrentMarkerStore()
  const { title, url, } = state


  return (
    <Modal
        title={title}
        visible={visible}
        onCancel={closeModal}
        footer={null}
        width='80vw'
        bodyStyle={{
          height:'80vh',
        }}
      >
        <iframe
          src={url?.replace('wikipedia', 'm.wikipedia')}
          title={title}
          width='100%'
          height='100%'
          style={{ border: 'none' }}
        />
      </Modal>
  )
}

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
