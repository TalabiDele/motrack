import { createContext, useState, useEffect } from "react";
import { API_URL } from "../config/index";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import Geocode from "react-geocode";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { GeoSearchControl } from "leaflet-geosearch";
import { useGeolocated } from "react-geolocated";
import useGeolocation from "react-hook-geolocation";
import toast, { Toaster } from "react-hot-toast";

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

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

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

    // if (coords) {
    //   setCenter({
    //     lat: parseFloat(coords.latitude),
    //     lng: parseFloat(coords.longitude),
    //   });

    //   setPosition([parseFloat(coords.latitude), parseFloat(coords.longitude)]);

    //   setLati(parseFloat(coords.latitude));
    //   setLong(parseFloat(coords.longitude));
    // }

    // Send address to server

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
    // lati,
    // long,
    // setPosition,
    // position,
    isOnline,
    setIsOnline,
    token,
  ]);

  // Send Location
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

  const handleAddress = async () => {
    const res = await fetch(
      `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=${long},${lati}`
    );

    const data = await res.json();

    if (res.ok) {
      setAddress(data.address.Address);
      setCity(data.address.City);
      setState(data.address.Region);
      setCountry(data.address.CntryName);
    }

    sendAddress();

    console.log(address);
    console.log(city);
    console.log(state);
    console.log(country);
  };

  // Register
  const register = async ({
    number,
    password,
    email,
    username,
    identifier,
  }) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
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
      toast.error(`${data.error.message} 😢`, {
        duration: 6000,
      });
    }

    // setUserData(data);

    if (res.ok) {
      setUser(data.user);
      // router.push("/find");

      toast.success("Account successfully created! 🎉", {
        duration: 6000,
      });

      const decoded = jwt(data.jwt);

      cookies.set("tracker_authorization", data.jwt, {
        expires: new Date(decoded.exp * 1000),
      });

      checkUserLoggedIn();
    } else {
      console.log("not working");
    }

    setLoading(false);
    toast.remove(toastId);
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
    const toastId = toast.loading("Loading...");

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
      toast.success("Login successful 🎉", {
        duration: 6000,
      });
      const decoded = jwt(data.jwt);

      cookies.set("tracker_authorization", data.jwt, {
        expires: new Date(decoded.exp * 1000),
      });

      checkUserLoggedIn();
    } else {
      toast.error(`${data.error.message} 😢`, {
        duration: 6000,
      });
    }

    // if(res.staus === 400) {
    //   setPassError(true)
    //   setEError(true)

    //   setPassMessage
    // }

    setLoading(false);
    toast.remove(toastId);
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
