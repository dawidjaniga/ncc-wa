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
  version: 'weekly',
  libraries: ['places']
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

        const input = document.getElementById('search-address')
        const searchBox = new window.google.maps.places.SearchBox(input)

        map.addListener('dragend', (...args) => {
          onCenterChanged(map.getCenter())
        })

        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces()
          console.log(places)

          if (places.length == 0) {
            return
          }
          // Clear out the old markers.
          markers.forEach(marker => {
            marker.setMap(null)
          })
          markers = []
          // For each place, get the icon, name and location.
          const bounds = new window.google.maps.LatLngBounds()
          places.forEach(place => {
            if (!place.geometry) {
              console.log('Returned place contains no geometry')
              return
            }
            const icon = {
              url: place.icon,
              size: new window.google.maps.Size(71, 71),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(17, 34),
              scaledSize: new window.google.maps.Size(25, 25)
            }
            // Create a marker for each place.
            markers.push(
              new window.google.maps.Marker({
                map,
                icon,
                title: place.name,
                position: place.geometry.location
              })
            )

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          })
          map.fitBounds(bounds)
        })
      } else {
        console.error('Google API not loaded')
      }
    })
    // eslint-disable-next-line
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
