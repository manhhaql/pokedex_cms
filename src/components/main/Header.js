import React from 'react';
import { connect } from 'react-redux';

import HTTPRequest from 'helper/httpRequest';

import {loadAuthData} from 'store/auth/actions';

import * as localStorageItemConstant from 'constant/localStorageItem';

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
            data: {
                token: this.props.appAuthentication.token
            }
        }).then(response => {
        }).catch(error => {
            console.log(error)
        }).finally(()=>{
            localStorage.removeItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_TOKEN)
            this.props.loadAuthData(null);
            setTimeout(() => {
                this.props.history.push(`/auth/login`)
            }, 0);
        })
        
    };

    render() {
        if(!this.props.appAuthentication) {
            return null
        };
        return (
            <div>
                <Navbar className="Header">
                    <NavbarBrand className="Header-brand" href="/">Component Name</NavbarBrand>
                    <Nav className="ml-auto">
                        <NavItem className="mr-2">
                            <NavbarText>
                                Hello <strong>{this.props.appAuthentication.user.username}!</strong>
                            </NavbarText>
                        </NavItem>
                        <NavItem>
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
                                        <a className="text-danger" onClick={this.onLogoutClicked}><i className="fas fa-power-off mr-2"></i>Logout</a>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
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