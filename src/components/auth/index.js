import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import AuthRoutes from './AuthRoutes';

import './Auth.css'

class AuthComponent extends React.Component {
    render() {
        return (
            <div>
                {renderRoutes(AuthRoutes)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AuthComponent));