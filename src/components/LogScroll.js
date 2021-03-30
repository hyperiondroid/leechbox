
import styled from 'styled-components';
import Text from './Text';

const Link = styled.a`
  color: ${props => props.color || '#f39c12'};
  font-family: Roobert;
  font-weight: 600;
  margin: 0.5em 1em 0em 1em;
`

const LogScrollImpl = ({className, logs, ...misc}) => {
    const logColor = {'text':'white','error':'#e74c3c', 'success':'#27ae60'}; 
    return(
        <div className={className}>
          {
            logs.map((log,i) => {
              return (
                log['type'] == 'link' ? (<Link key={i} href={log['link']}>{log['log']}</Link>) :
                <Text color = {logColor[log['type']]}key={i}>{log['log']}</Text>
                )
              })
          }
        </div>
    )
}

const LogScroll = styled(LogScrollImpl)`
    display: flex;
    flex-direction: column;
    width: 30em;
    padding: 0em 1em 0em 0em;
    font-size: 1em;
`

export default LogScroll;