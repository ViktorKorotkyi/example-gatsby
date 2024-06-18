import React from 'react';
import { navigate } from 'gatsby';

interface PrivateRouteProps {
  component: React.FC;
  location?: Location;
}

function PrivateRoute({ component: Component, location, ...rest }: PrivateRouteProps) {
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token');

  if (!isLoggedIn && location && location.pathname !== '/') {
    navigate('/');
    return null;
  }

  return <Component {...rest} />;
}

PrivateRoute.defaultProps = {
  location: undefined,
};

export default PrivateRoute;
