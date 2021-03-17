import styled from 'styled-components'
import { Tooltip } from 'antd'
import { emit } from 'pages/map/mediator'

const colors = {
  orange: {
    background: '#ff7e23e0',
    shadow: '#ffa769'
  },
  red: {
    background: '#ff2323b5',
    shadow: '#ff6969'
  },
  blue: {
    background: '#237bffe0',
    shadow: '#698bff'
  }
}

const Circle = styled.div`
  background-color: ${props => colors[props.color].background};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0px 0px 5px ${props => colors[props.color].shadow};
  opacity: 0.7;
  transition: all 0.2s ease-in;
  cursor: pointer;
  transform: scale(1);

  &:hover {
    opacity: 1;
  }
`

export default function Marker ({ title, url, color, onClick }) {
  function handleOnClick () {
    emit('userClickedMarker', title)
  }

  return (
    <Tooltip title={title} onClick={handleOnClick}>
      <Circle color={color} />
    </Tooltip>
  )
}
