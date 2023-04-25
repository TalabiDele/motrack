import React, { useState, useContext } from "react";
import { Container } from "./style";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [identifier, setIdentifier] = useState(
    (Math.random() + 1).toString(36).substring(7)
  );

  const {
    register,
    eError,
    setEError,
    passError,
    setPassError,
    nameError,
    setNameError,
    numError,
    setNumError,
    eMessage,
    setEMessage,
    passMessage,
    setPassMessage,
    numMessage,
    setNumMessage,
    nameMessage,
    setNameMessage,
  } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassError(true);
      setPassMessage("Passwords do not match");
      setTimeout(() => {
        setPassError(false);
      }, 10000);
    } else if (username === "") {
      setNameError(true);

      setNameMessage("Username field required");

      setTimeout(() => {
        setNameError(false);
      }, 10000);
    } else if (email === "") {
      setEError(true);
      setEMessage("Email field required");

      setTimeout(() => {
        setEError(false);
      }, 10000);
    } else if (password === "") {
      setPassError(true);
      setPassMessage("Password field required");

      setTimeout(() => {
        setPassError(false);
      }, 10000);
    } else if (confirmPassword === "") {
      setPassError(true);
      setPassMessage("Confirm Password");

      setTimeout(() => {
        setPassError(false);
      }, 10000);
    } else if (number === "") {
      setNumError(true);
      setNumMessage("Number field is required");

      setTimeout(() => {
        setNumError(false);
      }, 10000);
    } else {
      register({ username, email, password, number, identifier });
    }

    // setSlug(username);
  };

  return (
    <Container>
      <div className="container">
        <div className="wrapper">
          <h1>Sign up!</h1>
          <form onSubmit={handleSubmit}>
            <div className=" w-[100%] mb-[1rem]">
              <div className="relative z-0 w-[100%]">
                <input
                  type="username"
                  id="username"
                  aria-describedby="standard_error_help"
                  className={` ${
                    nameError
                      ? "text-red-600 border-b-red-600"
                      : "text-gray-900 border-[#e6eaf0]"
                  } block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-[#e6eaf0] peer`}
                  placeholder=" "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label
                  for="email"
                  className={` ${
                    nameError && "text-red-600"
                  } absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Enter username
                </label>
              </div>
              {nameError && (
                <p
                  id="standard_error_help"
                  class="mt-2 text-xs text-red-600 dark:text-red-400"
                >
                  <span className="font-medium">Oh, snapp!</span> {nameMessage}
                </p>
              )}
            </div>

            <div className=" w-[100%] mb-[1rem]">
              <div className="relative z-0 w-[100%]">
                <input
                  type="email"
                  id="email"
                  aria-describedby="standard_error_help"
                  className={` ${
                    eError
                      ? "text-red-600 border-b-red-600"
                      : "text-gray-900 border-[#e6eaf0]"
                  } block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-[#e6eaf0] peer`}
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  for="email"
                  className={` ${
                    eError && "text-red-600"
                  } absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Enter email
                </label>
              </div>
              {eError && (
                <p
                  id="standard_error_help"
                  class="mt-2 text-xs text-red-600 dark:text-red-400"
                >
                  <span className="font-medium">Oh, snapp!</span> {eMessage}
                </p>
              )}
            </div>

            <div className=" w-[100%] mb-[1rem]">
              <div className="relative z-0 w-[100%]">
                <input
                  type="password"
                  id="password"
                  aria-describedby="standard_error_help"
                  className={` ${
                    passError
                      ? "text-red-600 border-b-red-600"
                      : "text-gray-900 border-[#e6eaf0]"
                  } block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-[#e6eaf0] peer`}
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  for="email"
                  className={` ${
                    passError && "text-red-600"
                  } absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Enter password
                </label>
              </div>
              {passError && (
                <p
                  id="standard_error_help"
                  class="mt-2 text-xs text-red-600 dark:text-red-400"
                >
                  <span className="font-medium">Oh, snapp!</span> {passMessage}
                </p>
              )}
            </div>

            <div className=" w-[100%] mb-[1rem]">
              <div className="relative z-0 w-[100%]">
                <input
                  type="password"
                  id="confirmPassword"
                  aria-describedby="standard_error_help"
                  className={` ${
                    passError
                      ? "text-red-600 border-b-red-600"
                      : "text-gray-900 border-[#e6eaf0]"
                  } block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-[#e6eaf0] peer`}
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label
                  for="email"
                  className={` ${
                    passError && "text-red-600"
                  } absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Confirm password
                </label>
              </div>
              {passError && (
                <p
                  id="standard_error_help"
                  class="mt-2 text-xs text-red-600 dark:text-red-400"
                >
                  <span className="font-medium">Oh, snapp!</span> {passMessage}
                </p>
              )}
            </div>

            <div className=" w-[100%] mb-[1rem]">
              <div className="relative z-0 w-[100%]">
                <input
                  type="number"
                  id="number"
                  aria-describedby="standard_error_help"
                  className={` ${
                    numError
                      ? "text-red-600 border-b-red-600"
                      : "text-gray-900 border-[#e6eaf0]"
                  } block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-[#e6eaf0] peer`}
                  placeholder=" "
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <label
                  for="email"
                  className={` ${
                    numError && "text-red-600"
                  } absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Enter Number
                </label>
              </div>
              {numError && (
                <p
                  id="standard_error_help"
                  class="mt-2 text-xs text-red-600 dark:text-red-400"
                >
                  <span className="font-medium">Oh, snapp!</span> {numMessage}
                </p>
              )}
            </div>

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
            <button type="submit">Register</button>
          </form>
          <p className=" text-center mt-[1rem]">
            Already have an account?{" "}
            <Link to="/login" className=" text-primary_blue font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
