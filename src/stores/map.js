import { createStore, createHook } from 'react-sweet-state'
import { defaults } from 'react-sweet-state'
import { produce } from 'immer'
import { Loader } from '@googlemaps/js-api-loader'

defaults.mutator = (currentState, producer) => produce(currentState, producer)
defaults.devtools = true

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places']
})

let map

const initialState = {
  loaded: false,
  map: {
    center: { lat: 54.366667, lng: 18.633333 },
    zoom: 16
  }
}

const actions = {
  onInit: () => ({ setState, getState }) => {
    const state = getState()

    loader.load().then(() => {
      if (window.google) {
        map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: state.map.center.lat, lng: state.map.center.lat },
          zoom: state.map.zoom
          // minZoom: 14
        })

        map.addListener('dragend', (...args) => {
          actions.onDragEnd(map.getCenter())
          // onCenterChanged(map.getCenter())
        })
      } else {
        console.error('Google API not loaded')
      }
    })
  },
  onDragEnd: center => ({ setState, getState }) => {
    console.log('on DragEnd ', center)
  },
  onPlaceChanged: places => ({ setState, getState }) => {
    console.log('onPlaceChanged', places)
  }
}

const Store = createStore({ initialState, actions })

export const useMap = createHook(Store)
