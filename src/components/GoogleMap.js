import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Loader } from '@googlemaps/js-api-loader'

const StyledMap = styled.div.attrs({
  id: 'map'
})`
  height: 100%;
`

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  version: 'weekly'
})

export default function GoogleMap () {
  useEffect(() => {
    loader.load().then(() => {
      if (window.google) {
        new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8
        })
      } else {
        console.error('Google API not loaded')
      }
    })
  }, [])
  return (
    <>
      <StyledMap></StyledMap>
    </>
  )
}
