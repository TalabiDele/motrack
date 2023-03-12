import { createContext, useState, useEffect } from "react";
import { NEXT_PUBLIC_URL, API_URL } from "../config/index";
// import { parseCookies } from "@/helpers/index";
// import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
    // router.prefetch("/feeds");
  }, []);

  // Register
  const register = async (user) => {
    // setIsLoading(true);
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      //   setEmailError(res);
      console.log("not working");

      //   setTimeout(() => {
      //     setEmailError(false);
      //   }, 5000);
    }

    const data = await res.json();

    // setUserData(data);

    if (res.ok) {
      setUser(data.user);
      // router.push("/find");
    } else {
      console.log("not working");
    }
  };

  const forgotPassword = async ({ email }) => {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/forgot-password`, {
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
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/login`, {
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

    // console.log(data);
    // setUserData(data);

    if (res.ok) {
      setUser(data.user.user);
      // setUserData(data);
      // router.push("/find");
    } else {
      setErrorMessage(data.message);
      setError(true);
    }
  };

  // Logout
  const logout = async () => {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      // router.push("/login");
    }
  };

  // Check user logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        checkUserLoggedIn,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
