import styled from 'styled-components'

const Button = styled.button`
  background: #e74c3c;
  border-radius: 3px;
  border: 2px solid white;
  color: white;
  font-family: Roobert;
  font-weight: 600;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  user-select: none;
  &:hover {
    background: #ff3f34;
    color: white;
  }
  &:disabled {
    background: #646464;
    color: white;
  }
`

export default Button