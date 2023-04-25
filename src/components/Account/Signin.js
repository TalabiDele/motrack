import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Container } from "./style";
import { Link } from "react-router-dom";

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

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === "" && email === "") {
      // setError(true);
      setEError(true);
      setPassError(true);

      setEMessage("Email field required");
      setPassMessage("Password field requied");
      // setErrorMessage("Email and Password fields required");

      setTimeout(() => {
        setEError(false);
        setPassError(false);
      }, 5000);
    } else if (password === "") {
      setPassError(true);
      setPassMessage("Password field is required");

      setTimeout(() => {
        setPassError(false);
      }, 5000);
    } else if (email === "") {
      setEError(true);
      setEMessage("Email field required");

      setTimeout(() => {
        setEError(false);
      }, 5000);
    } else {
      setEError(false);
      setPassError(false);
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

            {loading ? (
              <div
                role="status"
                className=" bg-[#f19655] py-[1rem] rounded-[4px] w-full border-2 border-[#f19655] text-center"
              >
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-gray-600 "
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              <button type="submit">Login</button>
            )}
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
