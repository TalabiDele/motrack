import React, { useContext, useEffect } from "react";
import AuthContext from "./context/AuthContext";
import { motion as m } from "framer-motion";
import { MdCancel } from "react-icons/md";
import userImage from "./imgs/userImage.png";
import { API_URL } from "./config";

const Request = () => {
  const { isRequest, setIsRequest, user } = useContext(AuthContext);

  console.log(user.requests);

  const bgVariants = {
    visible: {
      y: 0,
    },
    hidden: {
      y: "-100%",
    },
  };

  const handleRequest = async (e) => {
    const receiver = await fetch(
      `${API_URL}/users/${user.id}?populate[circle][populate][0]=image&populate[requests][populate][1]=receiver&populate[requests][populate][2]=receiver.image&populate[requests][populate][3]=senders&populate[requests][populate][4]=senders.image`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            circle: [e],
          },
        }),
      }
    );

    const sender = await fetch(`${API_URL}/users/${e.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          circle: [user],
        },
      }),
    });

    const receiverData = await receiver.json();
    const senderData = await sender.json();

    console.log(receiverData);
    console.log(senderData);
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

        {user.requests?.map((e) =>
          e.senders.map((sent) => (
            <div
              className="flex justify-start mb-[1rem] bg-white rounded-3xl shadow-sm p-[1rem] transition-all duration-300 ease-in-out items-center"
              key={sent.id}
            >
              <img
                src={sent.image ? sent.image.url : userImage}
                alt=""
                className=" w-[4rem] h-[4rem] rounded-full object-cover mr-[0.5rem] border-2 border-primary p-[2px]"
              />
              <div className=" text-gray-600">
                <h1 className=" font-bold">{sent.username}</h1>

                <div className=" flex mt-[0.5rem]">
                  <button
                    className=" bg-primary text-text hover:bg-btn_hover rounded-lg py-[0.1rem] px-[1rem] transition-all duration-300 ease-in-out mr-[0.5rem]"
                    onClick={() => handleRequest(sent)}
                  >
                    Accept
                  </button>
                  <button className=" bg-cream text-black hover:bg-light rounded-lg py-[0.1rem] px-[1rem] transition-all duration-300 ease-in-out">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </m.div>
  );
};

export default Request;
