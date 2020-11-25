import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'

import { Layout } from 'antd'

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
  return (
    <StyledHeader>
      <Logo>Wikipedia Map</Logo>
      <div>
        <SearchBox />
      </div>
    </StyledHeader>
  )
}
