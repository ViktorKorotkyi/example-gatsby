import React from "react";
import { navigate } from "gatsby";

interface PrivateRouteProps {
  component: React.FC;
  location?: Location;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, location, ...rest }) => {
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");

  if (!isLoggedIn && location && location.pathname !== `/`) {
    navigate("/");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;