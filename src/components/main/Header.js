import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import HTTPRequest from 'helper/httpRequest';

import {loadAuthData} from 'store/auth/actions';

import * as localStorageItemConstant from 'constant/localStorageItem';
import * as routeNameConstant from 'constant/routeName';

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import { withRouter } from 'react-router';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            errorMessage: null
        };
    };
    

    onLogoutClicked = e => {
        e.preventDefault();
        this.setState({
            isLoading: false
        });

        HTTPRequest.post({
            url: 'authentication/signout',
            token: this.props.appAuthentication.token
        }).then(response => {
        }).catch(error => {
            console.log(error)
        }).finally(()=>{
            localStorage.removeItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_TOKEN)
            this.props.loadAuthData(null);
            setTimeout(() => {
                this.props.history.push(`/${routeNameConstant.ROUTE_NAME_AUTH}/${routeNameConstant.ROUTE_NAME_LOGIN}`)
            }, 0);
        })
        
    };

    render() {
        if(!this.props.appAuthentication) {
            return null
        };
        return (
            <Navbar className="Header">
                <NavbarBrand className="Header-brand" onClick={()=>this.props.toggleSidebar()}>&#9776;</NavbarBrand>
                <Nav className="ml-auto">
                    <NavItem className="mr-2">
                        <NavbarText>
                            Hello <strong>{this.props.appAuthentication.user.username}!</strong>
                        </NavbarText>
                    </NavItem>
                    <NavItem>
                        <ul className="list-unstyled">
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    <i className="fas fa-user-cog"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className=" text-center">
                                        <Link to="" className="text-danger" onClick={this.onLogoutClicked}><i className="fas fa-power-off mr-2"></i>Logout</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </ul>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    };
};

const mapStateToProps = (state) => ({
    appAuthentication: state.appAuthentication.current
});

const mapDispatchToProps = (dispatch) => ({
    loadAuthData: (newAuthData) => dispatch(loadAuthData(newAuthData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));