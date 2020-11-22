import React, { useEffect, useRef } from 'react'
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

let map

export default function GoogleMap ({ onCenterChanged, markers }) {
  useEffect(() => {
    loader.load().then(() => {
      if (window.google) {
        map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 54.366667, lng: 18.633333 },
          zoom: 16
          // minZoom: 14
        })

        map.addListener('dragend', (...args) => {
          onCenterChanged(map.getCenter())
        })
      } else {
        console.error('Google API not loaded')
      }
    })
  }, [])

  useEffect(() => {
    if (map) {
      markers.forEach(marker => {
        const position = {
          lat: marker.lat,
          lng: marker.lon
        }

        new window.google.maps.Marker({
          position,
          map: map
        })
      })
    }
  }, [markers])

  return (
    <>
      <StyledMap></StyledMap>
    </>
  )
}
