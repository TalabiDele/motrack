import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import { motion as m } from "framer-motion";
import { MdCancel } from "react-icons/md";
import userImage from "./imgs/userImage.png";
import { API_URL } from "./config";

const Request = () => {
  const [reqs, setReqs] = useState([]);

  const {
    isRequest,
    setIsRequest,
    user,
    checkUserLoggedIn,
    loading,
    setLoading,
  } = useContext(AuthContext);

  useEffect(() => {
    setReqs(user.requests);

    console.log(reqs);
    checkUserLoggedIn();
  }, [user, setReqs, reqs, checkUserLoggedIn]);

  const bgVariants = {
    visible: {
      y: 0,
    },
    hidden: {
      y: "-100%",
    },
  };

  const handleRequest = async (e, r) => {
    setLoading(true);

    console.log(e);

    const receiver = await fetch(`${API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        circle: [...user.circle, e.id],
      }),
    });

    const sender = await fetch(`${API_URL}/users/${e.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        circle: [...e.circle, user.id],
      }),
    });

    handleDelete(r);

    const receiverData = await receiver.json();
    const senderData = await sender.json();

    setLoading(false);
  };

  const handleDelete = async (e) => {
    setLoading(true);
    console.log(e);

    const res = await fetch(`${API_URL}/requests/${e.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    checkUserLoggedIn();

    setLoading(false);
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
      <div
        className={`${
          user.requests.length > 4 && " h-[35rem]"
        } bg-white backdrop-filter backdrop-blur-md bg-opacity-50 rounded-3xl p-[1rem] shadow-gray/70 shadow-lg transition-all duration-300 ease-in-out relative`}
      >
        <div className=" w-[100%] flex justify-end">
          <MdCancel
            className=" text-2xl cursor-pointer absolute right-0 -top-[2rem] mb-[0.5rem] "
            onClick={() => setIsRequest(false)}
          />
        </div>

        <h1 className=" font-medium text-center">
          You have {reqs?.length} request(s)
        </h1>

        {reqs?.map((e) =>
          e.senders.map((sent) => (
            <>
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
                      onClick={() => handleRequest(sent, e)}
                    >
                      Accept
                    </button>
                    <button
                      className=" bg-cream text-black hover:bg-light rounded-lg py-[0.1rem] px-[1rem] transition-all duration-300 ease-in-out"
                      onClick={() => handleDelete(e)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </m.div>
  );
};

export default Request;
