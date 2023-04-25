import { createContext, useState, useEffect } from "react";
import { API_URL } from "../config/index";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import Geocode from "react-geocode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [center, setCenter] = useState(null);
  const [lati, setLati] = useState();
  const [long, setLong] = useState();
  const [token, setToken] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [isCircle, setIsCircle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [map, setMap] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passMessage, setPassMessage] = useState("");
  const [eError, setEError] = useState(false);
  const [eMessage, setEMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameMessage, setNameMessage] = useState("");
  const [numError, setNumError] = useState(false);
  const [numMessage, setNumMessage] = useState("");

  const cookies = new Cookies();

  useEffect(() => {
    checkUserLoggedIn();

    navigator.geolocation.watchPosition(function (position) {
      setCenter({
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
      });

      setPosition([
        parseFloat(position.coords.latitude),
        parseFloat(position.coords.longitude),
      ]);

      setLati(parseFloat(position.coords.latitude));
      setLong(parseFloat(position.coords.longitude));
    });

    const handleAddress = async () => {
      fetch(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lati},${long}&lang=en-US&apiKey=eyRgLUsagB0fqHPn9zAZIqLEa7I8SYSRPPo3RNbFLqk`
      )
        .then((response) => response.json())
        .then((data) => {
          setAddress(data.items[0].address.label);
          setCity(data.items[0].address.city);
          setState(data.items[0].address.state);
          setCountry(data.items[0].address.countryName);
        })
        .catch((error) => console.error(error));
    };

    // Send address to server
    const sendAddress = async () => {
      if (user) {
        const res = await fetch(`${API_URL}/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            address,
            city,
            state,
            country,
          }),
        });

        const data = await res.json();
      }
    };

    if (lati && long) {
      handleAddress();
    }

    if (address && city && state && country) {
      sendAddress();
    }
  }, [
    address,
    city,
    state,
    country,
    lati,
    long,
    setPosition,
    position,
    isOnline,
    setIsOnline,
    token,
    user,
    checkUserLoggedIn,
  ]);

  // Send Location

  // Register
  const register = async ({
    number,
    password,
    email,
    username,
    identifier,
  }) => {
    setLoading(true);
    const res = await fetch(
      `${API_URL}/auth/local/register?populate[circle][populate][0]=image&populate[requests][populate][1]=receiver&populate[requests][populate][2]=receiver.image&populate[requests][populate][3]=senders&populate[requests][populate][4]=senders.image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          number,
          password,
          email,
          identifier,
        }),
      }
    );

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

      checkUserLoggedIn();
    } else {
      console.log("not working");
    }

    setLoading(false);
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
    setLoading(true);

    const res = await fetch(
      `${API_URL}/auth/local?populate[circle][populate][0]=image&populate[requests][populate][1]=receiver&populate[requests][populate][2]=receiver.image&populate[requests][populate][3]=senders&populate[requests][populate][4]=senders.image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      const decoded = jwt(data.jwt);

      cookies.set("tracker_authorization", data.jwt, {
        expires: new Date(decoded.exp * 1000),
      });

      checkUserLoggedIn();
    } else {
      setErrorMessage(data.error.message);
      setError(true);

      setPassError(true);
      setEError(true);

      setTimeout(() => {
        setError(false);
        setPassError(false);
        setEError(false);
      }, 10000);
    }

    // if(res.staus === 400) {
    //   setPassError(true)
    //   setEError(true)

    //   setPassMessage
    // }

    setLoading(false);
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
    const res = await fetch(
      `${API_URL}/users/me?populate[circle][populate][0]=image&populate[requests][populate][1]=receiver&populate[requests][populate][2]=receiver.image&populate[requests][populate][3]=senders&populate[requests][populate][4]=senders.image&populate[requests][populate][5]=senders.circle&populate=image`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("tracker_authorization")}`,
        },
      }
    );

    setToken(cookies.get("tracker_authorization"));

    const data = await res.json();

    setUser(data);

    if (res.ok) {
      setUser(data);
    } else {
      setUser(null);
    }

    // console.log(user);
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
        setLati,
        setLong,
        token,
        address,
        city,
        state,
        country,
        position,
        setPosition,
        isOnline,
        setIsOnline,
        isCircle,
        setIsCircle,
        isOpen,
        setIsOpen,
        map,
        setMap,
        isAdd,
        setIsAdd,
        isRequest,
        setIsRequest,
        loading,
        setLoading,
        error,
        setError,
        errorMessage,
        setErrorMessage,
        passError,
        setPassError,
        eError,
        setEError,
        eMessage,
        setEMessage,
        passMessage,
        setPassMessage,
        nameError,
        setNameError,
        nameMessage,
        setNameMessage,
        numError,
        setNumError,
        numMessage,
        setNumMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
