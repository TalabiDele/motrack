import React, { useState, useEffect, useContext } from "react";
import { Container } from "./style";
import useGeolocation from "react-hook-geolocation";
import { FiMapPin } from "react-icons/fi";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  useJsApiLoader,
  LoadScript,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useGeolocated } from "react-geolocated";
import { GiConsoleController } from "react-icons/gi";
import AuthContext from "../context/AuthContext";

const MapComponent = () => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [lati, setLati] = useState(null);
  const [long, setLong] = useState(null);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState([]);
  const [map, setMap] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLati(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    setPosition([lati, long]);
    if (lati && long) {
      // handleAddress();
    }
  }, [lati, long, position]);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: parseFloat(lati),
    lng: parseFloat(long),
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDS18virAJok2GzZcYEPNcPkT_Y1q2C2cc",
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleAddress = async () => {
    let response = await fetch(
      `https://geocode.xyz/${lati},${long}?geoit=json&auth=154169832664351130039x99496`
    );
    let data = await response.json();
    console.log(data);
    console.log(data.staddress);
    setAddress(data.staddress);
  };

  return (
    <Container>
      <div className="">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={7}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};

export default MapComponent;

/* <LoadScript googleMapsApiKey="AIzaSyDS18virAJok2GzZcYEPNcPkT_Y1q2C2cc">
          <GoogleMap
            zoom={20}
            center={center}
            mapContainerClassName="map-container"
          >
            <Marker icon={<FiMapPin />} position={center} />
            <p>{address}</p>
          </GoogleMap>
        </LoadScript> */
