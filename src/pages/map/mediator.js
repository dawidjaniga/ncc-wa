import { useMapStore } from './store'
import WikipediaApi from 'api/Wikipedia'

let map

export default function useMediator () {
  const [state, { setMapLoaded, addMarkers, setMarker }] = useMapStore()

  function centerMap (position) {
    map.setCenter(position)
  }

  const api = {
    async googleMapsComponentRendered ({ map: mapInstance, maps: googleMaps }) {
      map = mapInstance
      window.maps = googleMaps

      setMapLoaded(true)
    },
    async userSelectsPlaceInSearchBox (place) {
      const { position } = place
      const { lat, lng } = position

      addMarkers([
        {
          lat,
          lng,
          title: place.name,
          color: 'red'
        }
      ])

      centerMap(position)
      await getArticles(position)
    },
    async googleMapsCenterChanged ({ center, zoom, bounds, marginBounds }) {
      await getArticles(center)
    },
    async mouseEnteredPopover (title) {
      const article = state.markers.find(marker => marker.title === title)

      if (!article.loaded) {
        const { query } = await WikipediaApi.getArticle({ title })
        const result = Object.values(query.pages)[0]

        setMarker(title, {
          loaded: true,
          url: result.fullurl
        })
      }
    }
  }

  return api

  async function getArticles (position) {
    const results = await WikipediaApi.getArticles({
      coord: position,
      limit: 500
    })

    const markers = results.query.geosearch.map(article => {
      return {
        id: article.pageid,
        title: article.title,
        lat: article.lat,
        lng: article.lon,
        color: 'orange'
      }
    })
    addMarkers(markers)
  }
}
