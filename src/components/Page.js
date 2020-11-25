import { Layout } from 'antd'
import styled from 'styled-components'
import HeaderComponent from './Header'

const { Content, Footer } = Layout

const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

const StyledContent = styled(Content)`
  flex: 1;
  background: #fff;
`

const StyledFooter = styled(Footer)`
  text-align: center;
`

export default function Page ({ children }) {
  return (
    <StyledLayout>
      <HeaderComponent />
      <StyledContent>{children}</StyledContent>
      <StyledFooter>Wikipedia Map ©2020 Created by Janigowski</StyledFooter>
    </StyledLayout>
  )
}
