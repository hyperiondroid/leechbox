
import styled from 'styled-components';


const BannerContainer = styled.div`
  margin: 1em 1em;
  color: #e74c3c;
  user-select: none;
`

const Banner = () => {
  return (
    <BannerContainer>
    <pre>
    ████                             █████      █████ <br/>                        
    ░░███                            ░░███      ░░███ <br/>                         
    ░███   ██████   ██████   ██████  ░███████   ░███████   ██████  █████ █████<br/>
    ░███  ███░░███ ███░░███ ███░░███ ░███░░███  ░███░░███ ███░░███░░███ ░░███ <br/>
    ░███ ░███████ ░███████ ░███ ░░░  ░███ ░███  ░███ ░███░███ ░███ ░░░█████░  <br/>
    ░███ ░███░░░  ░███░░░  ░███  ███ ░███ ░███  ░███ ░███░███ ░███  ███░░░███ <br/>
    █████░░██████ ░░██████ ░░██████  ████ █████ ████████ ░░██████  █████ █████<br/>
    ░░░░░  ░░░░░░   ░░░░░░   ░░░░░░  ░░░░ ░░░░░ ░░░░░░░░   ░░░░░░  ░░░░░ ░░░░░     <br/>                                                        
    </pre>
    </BannerContainer>
    );
};

export default Banner;