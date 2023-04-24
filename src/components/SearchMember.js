import React, { useContext, useState } from "react";
import AuthContext from "./context/AuthContext";
import { motion as m } from "framer-motion";
import { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { Scroll } from "./Scroll";

const SearchMember = ({ searchItem, setSearchItem }) => {
  const { setPosition, map, error } = useContext(AuthContext);

  const bgVariants = {
    visible: {
      y: 0,
    },
    hidden: {
      y: "-100%",
    },
  };

  const handlePosition = (e) => {
    setPosition([parseFloat(e.lat), parseFloat(e.lng)]);

    map.setView([parseFloat(e.lat), parseFloat(e.lng)], map.getZoom(), {
      animate: true,
      pan: {
        duration: 2,
      },
    });

    setSearchItem(null);
  };
  return (
    searchItem && (
      <Scroll>
        <m.div
          variants={bgVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{
            duration: 0.1,
            ease: "easeOut",
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className=" ml-[2rem]"
        >
          <div className=" flex justify-end relative z-[200]">
            <MdCancel
              className=" text-2xl cursor-pointer absolute -right-[2rem] mb-[0.5rem] z-[100]"
              onClick={() => setSearchItem(null)}
            />
          </div>
          <div
            className={` ${
              searchItem.length > 5 && " h-[33rem]"
            } bg-white backdrop-filter backdrop-blur-md bg-opacity-50 rounded-3xl p-[1rem] shadow-gray/70 shadow-lg transition-all duration-300 ease-in-out relative overflow-y-scroll scroll-smooth scroll`}
          >
            {error ? (
              <div className="bg-orange-100 p-[1rem] transition-all duration-300 ease-in-out rounded-3xl text-center">
                <h1 className=" text-orange-500 font-medium">
                  Enter a valid username
                </h1>
              </div>
            ) : (
              searchItem?.map((item) => (
                <div
                  className=" flex items-center justify-start mb-[1rem] bg-white rounded-3xl shadow-sm p-[1rem] transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md"
                  key={item.id}
                  onClick={() => handlePosition(item)}
                >
                  <img
                    src={item.image.url}
                    alt=""
                    className="w-[3rem] h-[3rem] rounded-full border border-primary p-[2px] object-cover"
                  />
                  <div className=" ml-[1rem]">
                    <h1 className=" text-lg font-bold">{item.username}</h1>
                    <h2 className="">
                      {item.state}, {item.country}
                    </h2>
                  </div>
                </div>
              ))
            )}
          </div>
        </m.div>
      </Scroll>
    )
  );
};

export default SearchMember;
