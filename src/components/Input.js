import { useState } from 'react';
import styled from 'styled-components'

// Functional component must take className to apply styled() override 
const InputImpl = ({ className, handleChange = ()=>{} , ...misc}) =>{

  const [text,setText] = useState('');
  const onChange = (e) =>{

    const t = e.target.value
    setText(t);

    // Propogate to parent
    handleChange(t);
  }
  return (
  <input className= {className} onChange={onChange} value={text} spellCheck="false" {...misc}/>);
}

// Moving from defaultProps() for performance
const Input = styled(InputImpl)`
  background: transparent;
  border-radius: 3px;
  border: 2px solid white;
  color: white;
  font-family: Roobert;
  font-weight: 600;
  user-select: none;
  width: ${props => props.width || '200px'};
  margin: ${props => props.margin || '0.5em 0.25em'};
  padding: ${props => props.padding || '0.25em 0.32em'};
  outline: none;
  ::placeholder {
    font-size: 0.8em;
  }
`

export default Input