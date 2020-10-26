import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthComponent from '../components/auth';
import MainComponent from '../components/main';

const AppRoutes = [
    {
        path: `/auth`,
        component: AuthComponent
    },
    {
        path: `/main`,
        component: MainComponent
    },
    {
        path: '*',
        component: () => <Redirect to={`/main`} />
    }
]

export default AppRoutes;

