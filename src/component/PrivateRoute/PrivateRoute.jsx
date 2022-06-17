import React from 'react';
import { Route, Redirect } from 'react-router-dom';
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/productlist', state: { from: props.location } }} />
    )} />
//     <Route {...rest} render={props => (
//         <Component {...props} />
//    )} />
)