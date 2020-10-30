import React from 'react';
import { Redirect } from 'react-router-dom';

import * as routeNameConstant from 'constant/routeName';

import DashboardComponent from './dashboard';

import PokemonComponent from './pokemon';
import PokemonDetailComponent from './pokemon/PokemonDetail';

import UsersComponent from './users';




const MainRoutes = [
    {
        path: `/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_DASHBOARD}`,
        component: (props) =><DashboardComponent {...props}/>
    },
    {
        path: `/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_POKEMON}`,
        exact: true,
        component: (props) =><PokemonComponent {...props}/>
    },
    {
        path: `/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_POKEMON}/:id`,
        exact: true,
        component: (props) =><PokemonDetailComponent {...props}/>
    },
    {
        path: `/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_USERS}`,
        component: (props) =><UsersComponent {...props}/>
    },
    {
        path: '*',
        component: () => <Redirect to={`/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_DASHBOARD}`} />
    }
]

export default MainRoutes;

