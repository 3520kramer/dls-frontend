import { Link, RouteComponentProps } from 'react-router-dom';
import Image404 from '../../../images/404.png';
import Button from '../../Common/Button/Button';
import './PageNotFound.css';

interface IProps extends RouteComponentProps{

}

const PageNotFound = (props: IProps) => {
    return (
        <>
            <Link to="/"><img src={Image404} alt="Image404" className="image404"/></Link>
            <div className="button-wrapper">
                <Button onClick={() => props.history.push("/")}>GO TO HOMEPAGE</Button>
            </div>
        </>
    )
    };

export default PageNotFound;