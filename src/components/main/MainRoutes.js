import React from 'react';
import { Redirect } from 'react-router-dom';

import DashboardComponent from './dashboard';
import PokemonComponent from './pokemon';
import UsersComponent from './users';

const MainRoutes = [
    {
        path: `/main/dashboard`,
        component: (props) =><DashboardComponent {...props}/>
    },
    {
        path: `/main/pokemon`,
        exact: true,
        component: (props) =><PokemonComponent {...props}/>
    },
    {
        path: `/main/users`,
        component: (props) =><UsersComponent {...props}/>
    },
    {
        path: '*',
        component: () => <Redirect to={`/main/dashboard`} />
    }
]

export default MainRoutes;

