import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthComponent from '../components/auth';
import MainComponent from '../components/main';
import SplashComponent from '../components/splash';

const AppRoutes = [
    {
        path: "/",
        exact: true,
        component: (props) =><SplashComponent {...props}/>
    },
    {
        path: `/auth/:page(login|register)`,
        exact: true,
        component: (props) =><AuthComponent {...props}/>
    },
    {
        path: `/main`,
        component: (props) =><MainComponent {...props}/>
    },
    {
        path: '*',
        component: () => <Redirect to="/" />
    }
]

export default AppRoutes;

