import React, { useState, useEffect, useContext } from "react";
import { Container } from "./style";
import { useGeolocated } from "react-geolocated";
import { GiConsoleController } from "react-icons/gi";
import AuthContext from "../context/AuthContext";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { useMap } from "react-leaflet";
// import { useLeafletContext } from "@react-leaflet/core";
import { Icon } from "leaflet";
import userImage from "../imgs/userImage.png";
import MarkerComponent from "./MarkerComponent";
import toast, { Toaster } from "react-hot-toast";

const MapComponent = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);
  // const [map, setMap] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [isUser, setIsUser] = useState(null);

  const {
    user,
    lati,
    long,
    center,
    address,
    city,
    state,
    country,
    position,
    setPosition,
  } = useContext(AuthContext);

  console.log(position);

  // useEffect(() => {
  //   setPosition([lati, long]);

  //   console.log(position);
  // }, [lati, long, setPosition, position]);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyDS18virAJok2GzZcYEPNcPkT_Y1q2C2cc",
  // });

  // const onLoad = React.useCallback(
  //   function callback(map) {
  //     const bounds = new window.google.maps.LatLngBounds(center);
  //     map.fitBounds(bounds);
  //     setMap(map);
  //   },
  //   [center]
  // );

  const handleHoverCard = (e) => {
    setIsUser(e);

    console.log(isUser.username);

    setIsHover(true);

    return (
      isHover && (
        <p className=" relative z-[100] text-4xl bg-white">{isUser.username}</p>
      )
    );
  };

  const handleRemoveCard = (e) => {
    setIsHover(false);

    setIsUser(null);
  };

  const createIcon = (e) => {
    const customIcon = new Icon({
      iconUrl: `${e.image ? e.image.url : userImage}`,
      iconSize: [50, 50],
    });

    return customIcon;
  };

  return (
    <Container>
      {lati && long && (
        <MapContainer center={[lati, long]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerComponent />
        </MapContainer>
      )}
    </Container>
  );
};

export default MapComponent;
