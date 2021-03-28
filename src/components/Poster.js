import styled from 'styled-components';
import LibraryPlaceholder from './LibraryPlaceholder';

// Functional component must take className to apply styled() override 
// Default width is set to 214 to math that of Input component
const PosterImpl = ({ className, imgSrc, width = 214, height = 300, ...misc}) =>{
  return (
      imgSrc ? <img style={{objectFit: 'cover', width: '214px'}} className= {className} src={imgSrc} {...misc}/> 
              : <LibraryPlaceholder width = {width} height={height}/>  
    );
}

const Poster = styled(PosterImpl)`
  border-radius: 8px;
  width: ${props=> props.width || 214/16}em;
  margin: 0.5em 1em;
  user-select: none;
`

export default Poster