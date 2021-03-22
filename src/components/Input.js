import { useState } from 'react';
import styled from 'styled-components'


const InputImpl = ({ className, handleChange}) =>{

  const [text,setText] = useState('');
  const onChange = (e) =>{

    const t = e.target.value
    setText(t);

    // Propogate to parent
    handleChange(t);
  }
  return (
  <input className= {className} onChange={onChange}/>);
}

//const Input = styled.input`
const Input = styled(InputImpl)`
  background: transparent;
  border-radius: 3px;
  border: 2px solid white;
  color: white;
  font-family: Roobert;
  font-weight: 600;
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  outline: none;
`
Input.defaultProps = {
  margin: '0.5em 0.25em',
  padding: '0.25em 0.32em'
}

export default Input