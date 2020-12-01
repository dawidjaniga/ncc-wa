import React, { useState } from 'react'
import styled from 'styled-components'
import useMapPageMediator from 'pages/map/mediator'
import GoogleMapReact from 'google-map-react'
import { Tooltip } from 'antd'
import { useCurrentMarkerStore, useMapStore, useMarkerStore } from 'pages/map/store'
import styles from './MapStyles'
import { Modal } from 'antd'

const colors = {
  orange: {
    background: '#ff7e23e0',
    shadow: '#ffa769'
  },
  red: {
    background: '#ff2323b5',
    shadow: '#ff6969'
  }
}

const Circle = styled.div`
  background-color: ${props => colors[props.color].background};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0px 0px 5px ${props => colors[props.color].shadow};
  opacity: 0.7;
  transition: all 0.2s ease-in;
  cursor: pointer;
  transform: scale(1);

  &:hover {
    opacity: 1;
    /* transform: scale(1.2); */
  }
`

function Marker ({ title, url, color, onClick }) {
  const { userClickedMarker } = useMapPageMediator()

  function handleOnClick () {
    userClickedMarker(title)
  }

  return (
    <Tooltip title={title} onClick={handleOnClick}>
      <Circle color={color} />
    </Tooltip>
  )
}

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
