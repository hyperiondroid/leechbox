import styled from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid black;
  color: black;
  font-family: Roobert;
  font-weight: 600;
  margin: 0 1em;
  padding: 0.25em 1em;
  &:hover {
    background: black;
    color: white;
  }
`

export default Button