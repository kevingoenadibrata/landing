import { Heading, Pane } from 'evergreen-ui';
import Logo from '../transparent-logo.png';

const Badge = () => {
    return (
        <Pane display="flex" alignItems="center" opacity={0.2}>
            <img src={Logo} width="30px" />
        </Pane>
    );
};

export default Badge;
