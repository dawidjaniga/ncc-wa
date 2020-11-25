import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Input } from 'antd'

import { Layout } from 'antd'
import { useMap } from 'stores/map'

const { Header } = Layout

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
`

const Logo = styled.div`
  font-size: 18px;
  color: #fff;
`

const SearchBox = styled(Input).attrs({
  id: 'search-address',
  type: 'text',
  placeholder: 'Search Box'
})`
  margin: 0 20px;
`

export default function HeaderComponent () {
  const [{ loaded }, { onPlaceChanged }] = useMap()

  useEffect(() => {
    if (loaded) {
      const input = document.getElementById('search-address')
      const searchBox = new window.google.maps.places.SearchBox(input)

      searchBox.addListener('places_changed', () => {
        onPlaceChanged(searchBox.getPlaces())
      })
    }
  }, [loaded, onPlaceChanged])

  return (
    <StyledHeader>
      <Logo>Wikipedia Map</Logo>
      <div>
        <SearchBox />
      </div>
    </StyledHeader>
  )
}
