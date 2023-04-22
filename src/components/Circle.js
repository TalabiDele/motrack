import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import { motion as m } from "framer-motion";
import { MdCancel } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import userImage from "./imgs/userImage.png";
import { useLeafletContext } from "react-leaflet";

const Circle = () => {
  const { user, setIsCircle, isCircle, setPosition, position, map } =
    useContext(AuthContext);

  // const { map } = useLeafletContext();

  // const map = context.map;

  const handlePosition = (e) => {
    setPosition([parseFloat(e.lat), parseFloat(e.lng)]);

    map.setView([parseFloat(e.lat), parseFloat(e.lng)], map.getZoom(), {
      animate: true,
      pan: {
        duration: 2,
      },
    });
  };

  // const map = useMapEvents({
  //   click() {
  //     map.locate();
  //   },
  //   locationfound(e) {
  //     // setPosition(e.latlng)
  //     console.log(e.latlng);
  //     map.flyTo(e.latlng, map.getZoom());
  //   },
  // });

  const bgVariants = {
    visible: {
      y: 0,
    },
    hidden: {
      y: "-100%",
    },
  };

  return (
    <m.div
      variants={bgVariants}
      initial="hidden"
      animate={isCircle ? "visible" : "hidden"}
      exit="hidden"
      transition={{
        duration: 0.1,
        ease: "easeOut",
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className=" ml-[2rem] w-[20rem]"
    >
      <div
        className={`${
          user.circle.length > 4 && " h-[35rem]"
        } bg-white backdrop-filter backdrop-blur-md bg-opacity-50 rounded-3xl p-[1rem] shadow-gray/70 shadow-lg transition-all duration-300 ease-in-out relative overflow-y-scroll scroll-smooth`}
      >
        <div className=" w-[100%] flex justify-end">
          <MdCancel
            className=" text-2xl cursor-pointer absolute right-0 -top-[2rem] mb-[0.5rem]"
            onClick={() => setIsCircle(false)}
          />
        </div>

        <h1 className=" font-medium text-center">
          You have {user.circle.length} member(s)
        </h1>

        {user.circle.map(
          (circle) =>
            circle.id !== user.id && (
              <div
                className=" flex justify-start mb-[1rem] bg-white rounded-3xl shadow-sm p-[1rem] cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out"
                onClick={() => handlePosition(circle)}
              >
                <FaMapMarkerAlt className=" text-3xl text-primary mr-[0.5rem]" />
                {/* <img
                  src={circle.img ? circle.image.url : userImage}
                  alt=""
                  className=" w-[3rem] h-[3rem] rounded-full object-cover mr-[0.5rem] border-2 border-primary p-[2px]"
                /> */}
                <div className=" text-gray-600">
                  <h1 className=" font-bold">{circle.username}</h1>

                  <div className="">
                    <p className=" text-sm">{circle.address}</p>
                    <p className=" text-sm">
                      {circle.city}, {circle.state}
                    </p>
                    <p className=" text-sm">{circle.country}</p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </m.div>
  );
};

export default Circle;
