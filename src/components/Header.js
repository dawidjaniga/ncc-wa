import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Input } from 'antd'

import { Layout } from 'antd'
import { useMapStore } from 'pages/map/store'
import useMapPageMediator from 'pages/map/mediator'

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
  const { userSelectsPlaceInSearchBox } = useMapPageMediator()
  const [{ loaded }] = useMapStore()

  useEffect(() => {
    if (loaded) {
      const input = document.getElementById('search-address')
      const searchBox = new window.maps.places.SearchBox(input)

      searchBox.addListener('places_changed', () => {
        const firstPlace = searchBox.getPlaces()[0]
        const { name, formatted_address: address, geometry } = firstPlace
        const position = geometry.location.toJSON()
        userSelectsPlaceInSearchBox({ name, address, position })
      })
    }

    // eslint-disable-next-line
  }, [loaded])

  return (
    <StyledHeader>
      <Logo>Wikipedia Map</Logo>
      <div>
        <SearchBox />
      </div>
    </StyledHeader>
  )
}
