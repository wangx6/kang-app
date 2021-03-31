import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../model/UserModel";

const UserLogin = (props) => {

  console.log('llllllllllll');
  console.log(props);
  // state space
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { service: userService } = useContext(UserContext);

  // controller space
  const onFormSubmit = (event) => {
    event.preventDefault();
    userService
      .validateUser(email, password)
      .then((isValid) => _isValidUser(isValid));
  };

  const _isValidUser = (isValid) => {
    if (isValid) {
      history.push({
        pathname: "/products",
      });
    } else {
      console.log("invalid user");
    }
  };

  const validateForm = () => email.length > 0 && password.length > 0;

  // view space
  return (
    <>
      <div className="Login">
        <form onSubmit={onFormSubmit}>
          <label>
            Email:
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" disabled={!validateForm()}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
