import { createStore, createHook } from 'react-sweet-state'
import { defaults } from 'react-sweet-state'
import { produce } from 'immer'

defaults.mutator = (currentState, producer) => produce(currentState, producer)
defaults.devtools = true

const gdanskPosition = {
  lat: 54.35202520000001,
  lng: 18.6466384
}

const initialState = {
  loaded: false,
  markers: [],
  map: {
    center: gdanskPosition,
    zoom: 16
  }
}

const actions = {
  onInit: () => ({ setState, getState }) => {},
  setMapLoaded: value => ({ setState, getState }) => {
    setState(draft => {
      draft.loaded = value
    })
  },
  addMarkers: markers => ({ setState, getState }) => {
    const state = getState()
    const existingMarkers = state.markers.map(marker => marker.title)
    const newMarkers = markers.filter(
      marker => !existingMarkers.includes(marker.title)
    )

    setState(draft => {
      draft.markers.push(...newMarkers)
    })
  }
}

const Store = createStore({ initialState, actions })

export const useMapStore = createHook(Store)
