import React, { useEffect } from 'react'
import styled from 'styled-components'
import useMapPageMediator from 'pages/map/mediator'

const StyledMap = styled.div.attrs({
  id: 'map'
})`
  height: 100%;
`

export default function GoogleMap ({ onCenterChanged, markers }) {
  const {googleMapsComponentRendered} = useMapPageMediator()

  useEffect(() => {
    googleMapsComponentRendered()
    // eslint-disable-next-line
  }, [])

  // useEffect(() => {
  //   if (map) {
  //     markers.forEach(marker => {
  //       const position = {
  //         lat: marker.lat,
  //         lng: marker.lon
  //       }

  //       new window.google.maps.Marker({
  //         position,
  //         map: map
  //       })
  //     })
  //   }
  // }, [markers])

  return (
    <>
      <StyledMap></StyledMap>
    </>
  )
}
