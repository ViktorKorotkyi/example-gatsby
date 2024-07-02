import React from 'react';
import { navigate } from 'gatsby';

import IBlogPageProps from '../interfaces/IBlogPageProps.ts';

interface PrivateBlogRouteProps {
  component: React.FC<IBlogPageProps>;
  location?: Location;
}

function PrivateBlogRoute({
  component: Component, location, ...rest
}: Readonly<PrivateBlogRouteProps>) {
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token');

  if (!isLoggedIn && location && location.pathname !== '/') {
    navigate('/');
    return null;
  }

  return <Component {...rest} />;
}

PrivateBlogRoute.defaultProps = {
  location: undefined,
};

export default PrivateBlogRoute;
