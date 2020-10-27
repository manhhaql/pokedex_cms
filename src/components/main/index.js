import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SidebarComponent from './Sidebar';
import HeaderComponent from './Header';
import DashboardComponent from './dashboard';

import "./Main.css";

class MainComponent extends React.Component {
    render() {
        return (
            <div>
                <HeaderComponent/>
                <div className="Main-content">
                    <SidebarComponent/>
                    <DashboardComponent/>
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