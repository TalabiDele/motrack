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
  MarkerF,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useGeolocated } from "react-geolocated";
import { GiConsoleController } from "react-icons/gi";
import AuthContext from "../context/AuthContext";

const MapComponent = () => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);
  const [position, setPosition] = useState([]);
  const [map, setMap] = useState(null);

  const { user, lati, long, center } = useContext(AuthContext);

  console.log(user.id);

  useEffect(() => {}, []);

  const containerStyle = {
    width: "100%",
    height: "100vh",
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

  return (
    <Container>
      <div className="">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              fullscreenControl: false,
              zoomControl: false,
              scaleControl: true,
              mapTypeControl: false,
              streetViewControl: false,
            }}
          >
            <Marker position={center} />
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
