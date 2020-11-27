import { Loader } from '@googlemaps/js-api-loader'
import { useMapStore } from './store'
import WikipediaApi from 'api/Wikipedia'

const markers = []
let map

const iconBase =
  'https://developers.google.com/maps/documentation/javascript/examples/full/images/'
const icons = {
  parking: {
    icon: iconBase + 'parking_lot_maps.png'
  },
  library: {
    icon: iconBase + 'library_maps.png'
  },
  info: {
    icon: iconBase + 'info-i_maps.png'
  }
}

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places']
})
export default function useMediator () {
  const [state, { setMapLoaded }] = useMapStore()

  function createMap () {
    if (window.google) {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: state.map.center.lat, lng: state.map.center.lat },
        zoom: state.map.zoom
        // minZoom: 14
      })

      // map.addListener('dragend', (...args) => {
      //   actions.onDragEnd(map.getCenter())
      // })
    } else {
      console.error('Google API not loaded')
    }
  }

  function addMarker (markerOptions) {
    const marker = new window.google.maps.Marker({
      animation: window.google.maps.Animation.DROP,
      ...markerOptions,
      icon: icons[markerOptions.iconName].icon,
      map
    })

    markers.push(marker)
    return marker
  }

  function centerMap (position) {
    map.setCenter(position)
  }

  const api = {
    googleMapsComponentRendered () {
      loader.load().then(async () => {
        createMap()
        setMapLoaded(true)
      })
    },
    async userSelectsPlaceInSearchBox (place) {
      const { position } = place

      addMarker({
        position,
        iconName: 'info'
      })
      centerMap(position)

      const results = await WikipediaApi.getArticles({
        coord: position,
        limit: 50
      })

      results.query.geosearch.forEach(article => {
        var infowindow = new window.google.maps.InfoWindow({
          content: article.title
        })

        const marker = addMarker({
          position: {
            lat: article.lat,
            lng: article.lon
          },
          iconName: 'library'
        })

        window.google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map, marker)
        })
        console.log(article)
      })
    }
  }
  return api
}
