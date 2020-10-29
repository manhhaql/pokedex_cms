import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import SidebarComponent from './Sidebar';
import HeaderComponent from './Header';

import MainRoutes from './MainRoutes';

import "./Main.css";

class MainComponent extends React.Component {
    render() {
        return (
            <div className="Main">
                <HeaderComponent/>
                <div className="Main-wrapper">
                        <SidebarComponent/>
                        <div className="Main-content">
                            {renderRoutes(MainRoutes)}
                        </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainComponent));