import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const UserContext = React.createContext({});

export const UserModel = () => {
  // state
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(false);

  // power
  const validateUser = (u, pw) => {
    if (u && u.id == pw) {
      setUser(u);
      setIsAuth(true);
    }
  };

  const getUser = async (email) =>
    await axios.get("https://jsonplaceholder.typicode.com/users/" + email);

  // API
  return {
    user,
    isAuth,
    service: {
      getUser,
      setIsAuth,
      validateUser,
    },
  };
};

const UserProvider = (props) => {
  const userModel = UserModel();
  return (
    <UserContext.Provider value={userModel}>
      {props.children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.any,
};

export default UserProvider;
