import styled from 'styled-components'

const Text = styled.p`
  color: ${props => props.color || 'white'};
  font-family: Roobert;
  font-weight: 600;
  margin: 0.5em 1em 0em 1em;
`

export default Text