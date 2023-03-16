import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Container } from "./style";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, user } = useContext(AuthContext);

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <Container>
      <div className="container">
        <div className="wrapper">
          <h1>Welcome back</h1>
          <form onSubmit={handleSubmit}>
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

export default Signin;
