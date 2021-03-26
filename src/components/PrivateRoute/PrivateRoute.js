/* eslint-disable */
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../model/UserModel";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !!userContext.isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
