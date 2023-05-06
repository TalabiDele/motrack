import React, { useState, useContext } from "react";
import { Container } from "./style";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
      toast.error("Passwords do not match", {
        duration: 6000,
      });
      setTimeout(() => {
        setPassError(false);
      }, 10000);
    } else if (
      username === "" &&
      email === "" &&
      password === "" &&
      confirmPassword === "" &&
      number === ""
    ) {
      toast.error("All fields required", {
        duration: 6000,
      });
    } else if (username === "") {
      setNameError(true);

      setNameMessage("Username field required");

      toast.error("Username field required", {
        duration: 6000,
      });

      setTimeout(() => {
        setNameError(false);
      }, 10000);
    } else if (email === "") {
      setEError(true);
      setEMessage("Email field required");

      toast.error("Email field required", {
        duration: 6000,
      });

      setTimeout(() => {
        setEError(false);
      }, 10000);
    } else if (password === "") {
      setPassError(true);
      setPassMessage("Password field required");

      toast.error("Password field required", {
        duration: 6000,
      });

      setTimeout(() => {
        setPassError(false);
      }, 10000);
    } else if (confirmPassword === "") {
      setPassError(true);
      setPassMessage("Confirm Password");

      toast.error("Password field required", {
        duration: 6000,
      });

      setTimeout(() => {
        setPassError(false);
      }, 10000);
    } else if (number === "") {
      setNumError(true);
      setNumMessage("Number field is required");
      toast.error("Number field is required", {
        duration: 6000,
      });

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
      <Toaster position="top-center" reverseOrder={false} />
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
                  className={` block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-[#e6eaf0] peer`}
                  placeholder=" "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label
                  for="email"
                  className={` absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Enter username
                </label>
              </div>
            </div>

            <div className=" w-[100%] mb-[1rem]">
              <div className="relative z-0 w-[100%]">
                <input
                  type="email"
                  id="email"
                  aria-describedby="standard_error_help"
                  className={` block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-[#e6eaf0] peer`}
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  for="email"
                  className={` absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Enter email
                </label>
              </div>
            </div>

            <div className=" w-[100%] mb-[1rem]">
              <div className="relative z-0 w-[100%]">
                <input
                  type="password"
                  id="password"
                  aria-describedby="standard_error_help"
                  className={` block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-[#e6eaf0] peer`}
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  for="email"
                  className={` absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Enter password
                </label>
              </div>
            </div>

            <div className=" w-[100%] mb-[1rem]">
              <div className="relative z-0 w-[100%]">
                <input
                  type="password"
                  id="confirmPassword"
                  aria-describedby="standard_error_help"
                  className={` block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-[#e6eaf0] peer`}
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label
                  for="email"
                  className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Confirm password
                </label>
              </div>
            </div>

            <div className=" w-[100%] mb-[1rem]">
              <div className="relative z-0 w-[100%]">
                <input
                  type="number"
                  id="number"
                  aria-describedby="standard_error_help"
                  className={` block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-[#e6eaf0] peer`}
                  placeholder=" "
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <label
                  for="email"
                  className={` absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Enter Number
                </label>
              </div>
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
