
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import Row from '../components/Row';

const LeechFormImpl = ({className, ...misc}) => {

    return(
        <form autoComplete="off">
            {/* TODO: Move form from Landing page  */}
            <Row>
                <Input name="query" type="text" placeholder="Movie/TV" margin="0.5em 1em"/>
                <Button>Leech</Button>
            </Row>
        </form>
    )
}
const LeechForm = styled(LeechFormImpl)`
`

export default LeechForm;