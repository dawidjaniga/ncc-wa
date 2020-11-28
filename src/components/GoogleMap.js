import React from 'react'
import styled from 'styled-components'
import useMapPageMediator from 'pages/map/mediator'
import GoogleMapReact from 'google-map-react'
import { Popover } from 'antd'
import { useMapStore } from 'pages/map/store'
import styles from './MapStyles'

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
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`

function PopoverOuter ({ title, children }) {
  const { mouseEnteredPopover } = useMapPageMediator()

  function handleMouseEnter () {
    mouseEnteredPopover(title)
  }

  return <div onMouseEnter={handleMouseEnter}>{children}</div>
}

export default function GoogleMap ({ onCenterChanged }) {
  const {
    googleMapsComponentRendered,
    googleMapsCenterChanged
  } = useMapPageMediator()
  const [{ markers, map }] = useMapStore()

  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          libraries: ['places']
        }}
        defaultCenter={map.center}
        defaultZoom={map.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={googleMapsComponentRendered}
        onChange={googleMapsCenterChanged}
        options={{
          styles: styles.blue,
          minZoom: 10
        }}
      >
        {markers.map(marker => (
          <PopoverOuter
            title={marker.title}
            key={marker.lat + marker.lng + marker.title}
            lat={marker.lat}
            lng={marker.lng}
          >
            <Popover
              placement='top'
              title={marker.title}
              content={
                <iframe
                  src={marker.url?.replace('wikipedia', 'm.wikipedia')}
                  title={marker.title}
                  width={800}
                  height={1000}
                  style={{ border: 'none' }}
                />
              }
            >
              <Circle color={marker.color} />
            </Popover>
          </PopoverOuter>
        ))}
      </GoogleMapReact>
    </>
  )
}
