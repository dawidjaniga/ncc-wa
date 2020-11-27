import { createStore, createHook } from 'react-sweet-state'
import { defaults } from 'react-sweet-state'
import { produce } from 'immer'

defaults.mutator = (currentState, producer) => produce(currentState, producer)
defaults.devtools = true



const initialState = {
  loaded: false,
  map: {
    center: { lat: 54.366667, lng: 18.633333 },
    zoom: 16
  }
}

const actions = {
  onInit: () => ({ setState, getState }) => {
    
  },
  setMapLoaded: value => ({ setState, getState }) => {
    setState(draft => {
      draft.loaded = value
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

export const useMapStore = createHook(Store)
