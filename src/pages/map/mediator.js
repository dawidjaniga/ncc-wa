import { useMapStore } from './store'
import WikipediaApi from 'api/Wikipedia'

const maxArticles = 500
let map

export default function useMediator () {
  const [state, { setMapLoaded, addMarkers, setMarker }] = useMapStore()

  function centerMap (position) {
    map.setCenter(position)
  }

  async function getArticles (position) {
    const results = await WikipediaApi.getArticles({
      coord: position,
      limit: maxArticles
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

  const api = {
    async mapComponentRendered ({ map: mapInstance, maps: googleMaps }) {
      map = mapInstance
      window.maps = googleMaps

      setMapLoaded(true)
    },
    async userSelectedAddressInSearchBox (place) {
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
    async mapCenterChanged ({ center, zoom, bounds, marginBounds }) {
      await getArticles(center)
    },
    async userHoveredMarker (title) {
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
}
