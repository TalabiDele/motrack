import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Container } from "./style";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    login,
    user,
    error,
    setError,
    errorMessage,
    setErrorMessage,
    eError,
    setEError,
    passError,
    setPassError,
    eMessage,
    setEMessage,
    passMessage,
    setPassMessage,
    loading,
  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === "" && email === "") {
      toast.error("Email and password fields required! 😢", {
        duration: 6000,
      });
    } else if (password === "") {
      toast.error("Password field is required! 😢", {
        duration: 6000,
      });
    } else if (email === "") {
      toast.error("Email field is required! 😢", {
        duration: 6000,
      });
    } else {
      login({ email, password });
    }
  };

  return (
    <Container>
      <div className="container">
        <div className="wrapper">
          <h1>Welcome back</h1>
          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
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
                  } absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium`}
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
            <div className=" w-[100%]">
              <div class="relative z-0 w-[100%]">
                <input
                  type="password"
                  id="password"
                  aria-describedby="standard_error_help"
                  className={`${
                    passError
                      ? "text-red-600 border-b-red-600"
                      : "text-gray-900 border-[#e6eaf0]"
                  } block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-[#e6eaf0] peer`}
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  for="email"
                  className={` ${
                    passError && "text-red-600"
                  } absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-medium`}
                >
                  Enter password
                </label>
              </div>
              {passError && (
                <p
                  id="standard_error_help"
                  className="mt-2 text-xs text-red-600 dark:text-red-400"
                >
                  <span className="font-medium">Oh, snapp!</span> {passMessage}
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

            <button type="submit">Login</button>
          </form>
          <p className=" text-center mt-[1rem]">
            Don't have an account?{" "}
            <Link to="/register" className=" text-primary_blue font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Signin;
