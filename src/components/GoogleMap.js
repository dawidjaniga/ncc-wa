import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useMap } from 'stores/map'

const StyledMap = styled.div.attrs({
  id: 'map'
})`
  height: 100%;
`

export default function GoogleMap ({ onCenterChanged, markers }) {
  const [{ loaded }, { onInit, onPlaceChanged }] = useMap()

  useEffect(() => {
    onInit()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (loaded) {
      const input = document.getElementById('search-address')
      const searchBox = new window.google.maps.places.SearchBox(input)

      searchBox.addListener('places_changed', () => {
        onPlaceChanged(searchBox.getPlaces())
      })
    }
  }, [loaded, onPlaceChanged])

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
