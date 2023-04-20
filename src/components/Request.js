import React, { useContext, useEffect } from "react";
import AuthContext from "./context/AuthContext";
import { motion as m } from "framer-motion";
import { MdCancel } from "react-icons/md";
import userImage from "./imgs/userImage.png";

const Request = () => {
  const { isRequest, setIsRequest, user } = useContext(AuthContext);

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
      animate={isRequest ? "visible" : "hidden"}
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
      <div className=" bg-white backdrop-filter backdrop-blur-md bg-opacity-50 rounded-3xl p-[1rem] shadow-gray/70 shadow-lg transition-all duration-300 ease-in-out relative">
        <div className=" w-[100%] flex justify-end">
          <MdCancel
            className=" text-2xl cursor-pointer absolute right-0 -top-[2rem] mb-[0.5rem] "
            onClick={() => setIsRequest(false)}
          />
        </div>

        {user.requests?.map((e) => (
          <div
            className="flex justify-start mb-[1rem] bg-white rounded-3xl shadow-sm p-[1rem] cursor-pointer transition-all duration-300 ease-in-out"
            key={e.id}
          >
            <img
              src={e.img ? e.image.url : userImage}
              alt=""
              className=" w-[3rem] h-[3rem] rounded-full object-cover mr-[0.5rem] border-2 border-primary p-[2px]"
            />
            <div className=" text-gray-600">
              <h1 className=" font-bold">{e.username}</h1>

              <div className=""></div>
            </div>
          </div>
        ))}
      </div>
    </m.div>
  );
};

export default Request;
