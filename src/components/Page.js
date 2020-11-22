import { Layout } from 'antd'
import styled from 'styled-components'

const { Header, Content, Footer } = Layout

const Logo = styled.div`
  font-size: 18px;
  color: #fff;
`

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
      <Header>
        <Logo>Wikipedia Map</Logo>
      </Header>
      <StyledContent>{children}</StyledContent>
      <StyledFooter>Wikipedia Map ©2020 Created by Janigowski</StyledFooter>
    </StyledLayout>
  )
}
