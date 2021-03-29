
import styled from 'styled-components';
import Text from './Text';

const LogScrollImpl = ({className, logs, ...misc}) => {
    return(
        <div className={className}>
          {
            logs.map((log,i) => <Text key={i}>{log}</Text>)
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