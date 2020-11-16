import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import HTTPRequest from 'helper/httpRequest';

import { loadAuthData } from 'store/auth/actions';
import { changeInitialAppState } from 'store/appState/actions';

import * as appStateConstant from 'constant/appState';
import * as localStorageItemConstant from 'constant/localStorageItem';
import * as routeNameConstant from 'constant/routeName';

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
                token: token
            }).then(response => {
                if(response.data.code !== "SUCCESS") {
                    if(currentPath) {
                        console.log(currentPath)
                        localStorage.removeItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_CURRENT_PATH);
                        if(currentPath.indexOf('//') > - 1) {
                            currentPath = `/${routeNameConstant.ROUTE_NAME_AUTH}/${routeNameConstant.ROUTE_NAME_LOGIN}`
                        }
                        this.props.history.replace(currentPath);
                    } else {
                        this.props.history.replace(`/${routeNameConstant.ROUTE_NAME_AUTH}/${routeNameConstant.ROUTE_NAME_LOGIN}`);
                    }
                    // return;
                }
                this.props.loadAuthData(response.data.data)
                if(currentPath) {
                    localStorage.removeItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_CURRENT_PATH);
                    if(currentPath.indexOf('//') > - 1) {
                        currentPath = `/${routeNameConstant.ROUTE_NAME_AUTH}/${routeNameConstant.ROUTE_NAME_LOGIN}`
                    } 
                    this.props.history.replace(currentPath);
                } else {
                    this.props.history.replace(`/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_DASHBOARD}`);
                }
            }).catch(error => {
                if(currentPath) {
                    localStorage.removeItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_CURRENT_PATH);
                    if(currentPath.indexOf('//') > - 1) {
                        currentPath = `/${routeNameConstant.ROUTE_NAME_AUTH}/${routeNameConstant.ROUTE_NAME_LOGIN}`
                    }
                    this.props.history.replace(currentPath);
                } else {
                    this.props.history.replace(`/${routeNameConstant.ROUTE_NAME_AUTH}/${routeNameConstant.ROUTE_NAME_LOGIN}`);
                }
            }); 
        } else {
            this.props.loadAuthData(null);
            localStorage.removeItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_CURRENT_PATH);
            this.props.history.replace(`/${routeNameConstant.ROUTE_NAME_AUTH}/${routeNameConstant.ROUTE_NAME_LOGIN}`);
        }
    };

    render() {
        return (
            <div className="text-danger">
                <h1  style={{position: "absolute", top:"50%", left:"50%",transform: "translate(-50%, -50%)"}}>Loading Pokedex ...</h1>
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
