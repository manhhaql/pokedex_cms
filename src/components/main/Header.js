import React from 'react';
import { connect } from 'react-redux';

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

const HeaderComponent = (props) => {

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <Nav className="ml-auto">
                    <NavItem className="mr-2">
                        <NavbarText>
                            Hello <strong>{props.appAuthentication.user.username}!</strong>
                        </NavbarText>
                    </NavItem>
                    <NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav>
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
                                    <a className="text-danger"><i className="fas fa-power-off mr-2"></i>Logout</a>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
};

const mapStateToProps = (state) => ({
    appAuthentication: state.appAuthentication.current
})

export default connect(mapStateToProps, {})(HeaderComponent);