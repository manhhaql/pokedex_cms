import {
    Navbar
} from 'reactstrap';

const FooterComponent = () => {
    return (
        <Navbar className="Footer">
            <div>2020 &copy; Pokemon Company&trade;</div>
            <div className="Footer-icon">
                <img className="ml-2" alt="" src="https://storage.googleapis.com/hapokedex.appspot.com/public/catch_them_all600.png"  style={{height: "60px"}}></img>
            </div>
        </Navbar>
    )
};

export default FooterComponent;