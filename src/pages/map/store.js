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
  currentMarkerTitle: '',
  visible: false,
  map: {
    center: gdanskPosition,
    zoom: 16
  }
}

const actions = {
  setMapLoaded: value => ({ setState }) => {
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
  },
  setMarker: (title, data) => ({ setState, getState }) => {
    const state = getState()
    const markerIndex = state.markers.findIndex(
      marker => marker.title === title
    )

    setState(draft => {
      draft.markers[markerIndex] = {
        ...state.markers[markerIndex],
        ...data
      }
    })
  },
  setCurrentMarker: title => ({ setState, getState }) => {
    setState(draft => {
      draft.currentMarkerTitle = title
    })
  },
  closeModal: () => ({ setState, getState }) => {
    setState(draft => {
      draft.visible = false
    })
  },
  showModal: () => ({ setState, getState }) => {
    setState(draft => {
      draft.visible = true
    })
  }
}

const Store = createStore({ initialState, actions })

export const useMapStore = createHook(Store)
export const useCurrentMarkerStore = createHook(Store, {
  selector: (state, props) =>
    state.markers.find(marker => marker.title === state.currentMarkerTitle) ||
    {}
})

export const useMapStoreBySelector = createHook(Store, {
  selector: (state, selector) => selector(state)
})
