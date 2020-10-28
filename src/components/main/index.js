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
            <div>
                <HeaderComponent/>
                <div className="Main-content">
                    <SidebarComponent/>
                    {renderRoutes(MainRoutes)}
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