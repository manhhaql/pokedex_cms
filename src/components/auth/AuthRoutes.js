import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginComponent from './Login';
import RegisterComponent from './Register';

const AuthRoutes = [
    {
        path: `/auth/login`,
        component: LoginComponent
    }, 
    {
        path: `/auth/register`,
        component: RegisterComponent
    },
    {
        path: '*',
        component: () => <Redirect to={`/auth/login`} />
    }
];

export default AuthRoutes;

