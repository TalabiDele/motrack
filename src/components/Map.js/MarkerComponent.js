import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import userImage from "../imgs/userImage.png";
import { useEffect } from "react";
import { Container } from "../PopupStyle";

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
    <Container>
      <div className="container">
        {user?.circle.map((e) => (
          <Marker position={[e.lat, e.lng]} key={e.id} icon={createIcon(e)}>
            <Popup>
              <div className=" flex">
                <img
                  src={e.image ? e.image.url : userImage}
                  alt=""
                  className=" w-[3rem] h-[3rem] rounded-full border border-primary p-[2px] object-cover mr-[0.5rem]"
                />

                <div className="">
                  <h1 className=" font-bold text-lg">{e.username}</h1>
                  <h3 className="">
                    {e.address}, {e.city}, {e.state}, {e.country}
                  </h3>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <Marker position={[user.lat, user.lng]} icon={createIcon(user)}>
          <Popup>
            <div className=" flex">
              <img
                src={user.image ? user.image.url : userImage}
                alt=""
                className=" w-[3rem] h-[3rem] rounded-full border border-primary p-[2px] object-cover mr-[0.5rem]"
              />

              <div className="">
                <h1 className=" font-bold text-lg">{user.username}</h1>
                <h3 className="">
                  {user.address}, {user.city}, {user.state}, {user.country}
                </h3>
              </div>
            </div>
          </Popup>
        </Marker>
      </div>
    </Container>
  );
};

export default MarkerComponent;
