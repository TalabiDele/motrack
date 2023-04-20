import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import userImage from "../imgs/userImage.png";
import { useEffect } from "react";

const MarkerComponent = () => {
  const { user, setMap, map } = useContext(AuthContext);

  const mapObj = useMap();

  useEffect(() => {
    setMap(mapObj);

    console.log(map);
  }, [mapObj, setMap, map]);

  const createIcon = (e) => {
    const customIcon = new Icon({
      iconUrl: `${e.image ? e.image.url : userImage}`,
      iconSize: [50, 50],
    });

    return customIcon;
  };

  return (
    <div>
      <div className="container">
        {user?.circle.map((e) => (
          <Marker position={[e.lat, e.lng]} key={e.id} icon={createIcon(e)}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </div>
    </div>
  );
};

export default MarkerComponent;
