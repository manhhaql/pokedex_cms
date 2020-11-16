import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import SidebarComponent from './Sidebar';
import HeaderComponent from './Header';
import FooterComponent from './Footer';

import MainRoutes from './MainRoutes';

import "./Main.css";

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        };
    };

    toggleSidebar = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    };

    render() {
        return (
            <div className="Main" style={{zIndex:-1}}>
                <HeaderComponent toggleSidebar={this.toggleSidebar}/>
                <div className="Main-wrapper">
                    <SidebarComponent 
                        sidebarOpen={this.state.sidebarOpen}
                        toggleSidebar={this.toggleSidebar}
                    />
                    <div className="Main-content">
                        {renderRoutes(MainRoutes)}
                    </div>
                </div>
                <FooterComponent/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainComponent));