import React, { useState, useContext } from "react";
import { Container } from "./style";
import AuthContext from "../context/AuthContext";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [identifier, setIdentifier] = useState(
    (Math.random() + 1).toString(36).substring(7)
  );

  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // setError(true);
      setTimeout(() => {
        // setError(false);
      }, 5000);
    }
    if (username === "") {
      // setNameError(true);

      setTimeout(() => {
        // setNameError(false);
      }, 5000);
    }
    if (email === "") {
      // setEmailEmpty(true);

      setTimeout(() => {
        // setEmailEmpty(false);
      }, 5000);
    }
    if (password === "") {
      // setPasswordError(true);

      setTimeout(() => {
        // setPasswordError(false);
      }, 5000);
    }
    if (confirmPassword === "") {
      // setConfirmError(true);

      setTimeout(() => {
        // setConfirmError(false);
      }, 5000);
    }

    // setSlug(username);
    register({ username, email, password, number });
  };

  return (
    <Container>
      <div className="container">
        <div className="wrapper">
          <h1>Welcome back</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Enter username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John Doe"
              className="input"
            />
            <label htmlFor="email">Enter your email address</label>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@mymail.com"
              className="input"
            />
            <label htmlFor="password">Enter your password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="************"
              className="input"
            />
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="************"
              className="input"
            />
            <label htmlFor="number">Enter Phone Number</label>
            <input
              id="number"
              name="number"
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="8012345678"
              className="input"
            />
            <div className="actions">
              <div className="save">
                <input
                  type="checkbox"
                  id="save"
                  name="save"
                  className="check"
                />
                <label htmlFor="save">Save my Password</label>
              </div>
              <p>Forgot Password</p>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
