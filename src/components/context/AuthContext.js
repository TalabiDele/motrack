import { createContext, useState, useEffect } from "react";
import { API_URL } from "../config/index";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [center, setCenter] = useState(null);
  const [lati, setLati] = useState();
  const [long, setLong] = useState();
  const [token, setToken] = useState();

  const cookies = new Cookies();

  useEffect(() => {
    checkUserLoggedIn();

    navigator.geolocation.watchPosition(function (position) {
      setCenter({
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
      });

      setLati(parseFloat(position.coords.latitude));
      setLong(parseFloat(position.coords.longitude));
    });

    console.log(user);

    console.log(lati, long);
    // if (user) {

    // }
  }, []);

  // Send Location

  // Register
  const register = async ({ number, password, email, username }) => {
    const res = await fetch(`${API_URL}/auth/local/register?populate=deep`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        number,
        password,
        email,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      //   setEmailError(res);
      console.log("not working");

      //   setTimeout(() => {
      //     setEmailError(false);
      //   }, 5000);
    }

    // setUserData(data);

    if (res.ok) {
      setUser(data.user);
      // router.push("/find");

      const decoded = jwt(data.jwt);

      cookies.set("tracker_authorization", data.jwt, {
        expires: new Date(decoded.exp * 1000),
      });

      // checkUserLoggedIn();
    } else {
      console.log("not working");
    }
  };

  const forgotPassword = async ({ email }) => {
    const res = await fetch(`${API_URL}/api/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    // console.log(data);
    // setUserData(data);

    if (res.ok) {
      setUser(data.user.user);
      // router.push("/feeds");
    } else {
      setErrorMessage(data.message);
      setError(true);
    }
  };

  // Login
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${API_URL}/auth/local?populate=deep`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      setUser(data.user);
      // setUserData(data);
      // router.push("/find");

      const decoded = jwt(data.jwt);

      cookies.set("tracker_authorization", data.jwt, {
        expires: new Date(decoded.exp * 1000),
      });

      // checkUserLoggedIn();
    } else {
      setErrorMessage(data.message);
      setError(true);
    }
  };

  // Logout
  const logout = async () => {
    cookies.remove("tracker_authorization", "", {
      expires: new Date(0),
    });
    setUser(null);
  };

  // Check user logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${API_URL}/users/me?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("tracker_authorization")}`,
      },
    });

    setToken(cookies.get("tracker_authorization"));

    const data = await res.json();

    setUser(data);

    if (res.ok) {
      setUser(data);
    } else {
      setUser(null);
    }

    console.log(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        checkUserLoggedIn,
        register,
        center,
        lati,
        long,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
