import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  flex-wrap: ${props => props.wrap || 'nowrap'};
  @media (max-width: 360px) {
    justify-content: space-between;
  }
`

export default Row