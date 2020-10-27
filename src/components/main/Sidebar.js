import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

const SidebarComponent = (props) => {
    return (
        <div>
            <div className="Sidebar">
                <div className="Sidebar-logo">
                    <div>
                        <div className="Sidebar-logo__img">
                            <img src="https://cdn.iconscout.com/icon/premium/png-48-thumb/pokemon-12-357132.png" alt="react-logo" />
                        </div>
                        <div className="Sidebar-logo__text">
                            Pokedex
                    </div>
                    </div>
                </div>
                <ul className="Sidebar-list list-unstyled">
                    <li className="Sidebar-list__item">
                        <Link to={`/main/dashboard`}>
                            <i className="fas fa-chart-pie mr-2 fa-2x"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li className="Sidebar-list__item">
                        <Link to={`/main/pokemon`}>
                            <i className="fas fa-dragon mr-2 fa-2x"></i>
                            Pokemon
                        </Link>
                    </li>
                    <li className="Sidebar-list__item">
                        <Link to={`/main/users`}>
                            <i className="fas fa-users mr-2 fa-2x"></i>
                            Users
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SidebarComponent;