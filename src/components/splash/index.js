import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import HTTPRequest from 'helper/httpRequest';

import { loadAuthData } from '../../store/auth/actions';

class SplashComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let token = localStorage.getItem("token")
        if(token) {
            HTTPRequest.get({
                url: 'users/user-info',
                params: {
                    token: token
                }
            }).then(response => {
                if(response.data.code !== "SUCCESS") {
                    this.props.loadAuthData(null);
                    localStorage.removeItem("token");
                    this.props.history.replace(`/auth/login`);
                    return;
                }
                this.props.loadAuthData(response.data.data)
                this.props.history.replace(`/main`)
            }).catch(error => {
                console.log(error)
                // Show Error message
                return;
            }); 
        } 
        this.props.loadAuthData(null);
        this.props.history.replace(`/auth/login`)
        
    };

    render() {
        return (
            <div className="text-danger">
                <h2>SPLASH</h2>
            </div>
        )
    }
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) => ({
    loadAuthData: (newAuthData) => dispatch(loadAuthData(newAuthData))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SplashComponent));
