import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import HTTPRequest from 'helper/httpRequest';

import { loadAuthData } from 'store/auth/actions';
import { changeInitialAppState } from 'store/appState/actions';

import * as appStateConstant from 'constant/appState';
import * as localStorageItemConstant from 'constant/localStorageItem';

class SplashComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.changeInitialAppState(appStateConstant.APP_STATE_IS_INITIAL_YES);
        let token = localStorage.getItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_TOKEN);
        let currentPath = localStorage.getItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_CURRENT_PATH);

        if(token) {
            HTTPRequest.get({
                url: 'users/user-info',
                params: {
                    token: token
                }
            }).then(response => {
                if(response.data.code !== "SUCCESS") {
                    if(currentPath) {
                        console.log(currentPath)
                        localStorage.removeItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_CURRENT_PATH);
                        if(currentPath.indexOf('//') > - 1) {
                            currentPath = `/auth/login`
                        }
                        this.props.history.replace(currentPath);
                    } else {
                        this.props.history.replace(`/auth/login`);
                    }
                    return;
                }
                this.props.loadAuthData(response.data.data)
                if(currentPath) {
                    localStorage.removeItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_CURRENT_PATH);
                    if(currentPath.indexOf('//') > - 1) {
                        currentPath = `/auth/login`
                    } 
                    this.props.history.replace(currentPath);
                } else {
                    this.props.history.replace(`/main/dashbpard`);
                }
            }).catch(error => {
                console.log(error)
                // Show Error message
                return;
            }); 
        } else {
            this.props.loadAuthData(null);
            if(currentPath) {
                localStorage.removeItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_CURRENT_PATH);
                if(currentPath.indexOf('//') > - 1) {
                    currentPath = `/auth/login`
                }
                this.props.history.replace(currentPath);
            } else {
                this.props.history.replace(`/auth/login`);
            }
        }
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
    loadAuthData: (newAuthData) => dispatch(loadAuthData(newAuthData)),
    changeInitialAppState: (newInitialAppState) => dispatch(changeInitialAppState(newInitialAppState))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SplashComponent));
