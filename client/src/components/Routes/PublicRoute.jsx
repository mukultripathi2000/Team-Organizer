/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PublicRoute({ component: Component, restricted, ...rest }) {
  const { currentUser } = useAuth();
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        currentUser._id && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PublicRoute;
