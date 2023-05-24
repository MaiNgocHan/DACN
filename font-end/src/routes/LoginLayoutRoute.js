import React from "react";
import { Route } from "react-router-dom";
export const loginLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={(props) => (
        <div>
          <Component {...props} />
        </div>
      )}
    />
  );
};
export default loginLayoutRoute;