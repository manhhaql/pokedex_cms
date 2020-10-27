import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoginComponent from './Login';
import RegisterComponent from './Register';

import './Auth.css'

class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
                {
                    this.props.match.params.page === 'login' && (
                        <LoginComponent />
                    )
                }
                {
                    this.props.match.params.page === 'register' && (
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