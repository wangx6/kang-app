import React, { useState } from "react";
import PropTypes from "prop-types";

const initUsers = [
  { email: "1", password: "1" },
  { email: "2", password: "2" },
  { email: "3", password: "3" },
];

export const UserContext = React.createContext({});

const UserModel = (props) => {
  // state
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(false);

  // power
  const validateUser = (email, pw) =>
    new Promise((resolve) =>
      resolve(initUsers.find((u) => u.email === email && u.password === pw))
    ).then((u) => {
      setUser(u);
      setIsAuth(true);
      return !!u;
    });

  // API
  return (
    <UserContext.Provider
      value={{
        user,
        isAuth,
        service: {
          validateUser,
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

UserModel.propTypes = {
  children: PropTypes.array,
};
export default UserModel;
