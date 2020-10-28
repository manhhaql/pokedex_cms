import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoginComponent from './Login';
import RegisterComponent from './Register';

import * as routeNameConstant from 'constant/routeName';

import './Auth.css'

class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AuthComponent));