import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoginComponent from './Login';
import RegisterComponent from './Register';
import FooterComponent from '../main/Footer';
import HeaderComponent from '../main/Header';

import * as routeNameConstant from 'constant/routeName';

import './Auth.css'

class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div className="Auth-container">
                <HeaderComponent/>
                <h2 className="Auth-container__title text-danger">Welcome to HaPokedex</h2>
                {
                    this.props.match.params.page === routeNameConstant.ROUTE_NAME_LOGIN && (
                        <LoginComponent />
                    )
                }
                {
                    this.props.match.params.page === routeNameConstant.ROUTE_NAME_REGISTER&& (
                        <RegisterComponent />
                    )
                }
                <FooterComponent/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AuthComponent));