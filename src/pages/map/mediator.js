import { useMapStore } from './store'
import WikipediaApi from 'api/Wikipedia'
import ArticlesDatabase from 'services/ArticlesDatabase'

const maxArticles = 250
let map

const listeners = {}

export function emit (event, ...data) {
  const listener = listeners[event]

  if (listener) {
    listener(...data)
  } else {
    console.warn('MapMediator: no listner attach for event: ', event)
  }
}

function attachListener (event, listener) {
  listeners[event] = listener
}

export default function useMediator () {
  const [
    state,
    { setMapLoaded, addMarkers, setMarker, setCurrentMarker, showModal }
  ] = useMapStore()

  function centerMap (position) {
    map.setCenter(position)
  }

  async function getArticles (position) {
    const results = await WikipediaApi.getArticles({
      coord: position,
      limit: maxArticles
    })
    ArticlesDatabase.refresh()

    const markers = results.query.geosearch.map(article => {
      const isRead = ArticlesDatabase.isArticleRead(article.title)

      return {
        id: article.pageid,
        title: article.title,
        lat: article.lat,
        lng: article.lon,
        color: isRead ? 'blue' : 'orange'
      }
    })
    addMarkers(markers)
  }

  async function mapCenterChanged ({ center, zoom, bounds, marginBounds }) {
    await getArticles(center)
  }

  async function mapComponentRendered ({ map: mapInstance, maps: googleMaps }) {
    map = mapInstance
    window.maps = googleMaps

    setMapLoaded(true)
  }

  async function userSelectedAddressInSearchBox (place) {
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
  }

  async function userClickedMarker (title) {
    const article = state.markers.find(marker => marker.title === title)
    setCurrentMarker(title)
    showModal()

    if (!article.loaded) {
      const { query } = await WikipediaApi.getArticle({ title })
      const result = Object.values(query.pages)[0]

      setMarker(title, {
        loaded: true,
        url: result.fullurl,
        color: 'blue'
      })
      ArticlesDatabase.setArticleAsRead(title)
    }
  }

  attachListener('mapComponentRendered', mapComponentRendered)
  attachListener('mapCenterChanged', mapCenterChanged)
  attachListener(
    'userSelectedAddressInSearchBox',
    userSelectedAddressInSearchBox
  )
  attachListener('userClickedMarker', userClickedMarker)
}
