import styled from 'styled-components'

const Input = styled.input`
  background: transparent;
  border-radius: 3px;
  border: 2px solid white;
  color: white;
  font-family: Roobert;
  font-weight: 600;
  margin: ${props => props.margin};
  padding: ${props => props.margin};
  outline: none;
`
Input.defaultProps = {
  margin: '0.5em 0.25em',
  padding: '0.25em 0.32em'
}

export default Input