import React from 'react';
import { Link } from 'react-router-dom';

import * as routeNameConstant from'constant/routeName';

const SidebarComponent = (props) => {
    return (
        <div className={`Sidebar ${props.sidebarOpen ? "open" : ""}`}>
            <div className="Sidebar-logo">
                <div>
                    <div className="Sidebar-logo__img">
                        <img alt="" src="https://storage.googleapis.com/hapokedex.appspot.com/public/pokeball48.png" alt="react-logo" />
                    </div>
                    <div className="Sidebar-logo__text">
                        Pokedex
                </div>
                </div>
            </div>
            <ul className="Sidebar-list list-unstyled">
                <li className="Sidebar-list__item">
                    <Link to={`/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_DASHBOARD}`} onClick={()=>props.toggleSidebar()}>
                        <i className="fas fa-chart-pie mr-2 fa-2x"></i>
                        Dashboard
                    </Link>
                </li>
                <li className="Sidebar-list__item">
                    <Link to={`/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_POKEMON}`} onClick={()=>props.toggleSidebar()}>
                        <i className="fas fa-dragon mr-2 fa-2x"></i>
                        Pokemon
                    </Link>
                </li>
                <li className="Sidebar-list__item">
                    <Link to={`/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_USERS}`} onClick={()=>props.toggleSidebar()}>
                        <i className="fas fa-users mr-2 fa-2x"></i>
                        Users
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SidebarComponent;