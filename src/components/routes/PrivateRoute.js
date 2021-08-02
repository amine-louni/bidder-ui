import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../../hooks/user';

function PrivateRoute({ Component, ...rest }) {
  const { user } = useUser();
  return (
    <Route
      {...rest}
      render={props =>
        !user._id.isAuth && !user._id.loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PrivateRoute;
