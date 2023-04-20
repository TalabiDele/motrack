import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  HiStatusOnline,
  HiStatusOffline,
  HiOutlineLogout,
} from "react-icons/hi";
import { TiGroup } from "react-icons/ti";
import { BsFillBellFill, BsFillPlusCircleFill } from "react-icons/bs";
// import { TbBellFilled } from "react-icons/tb";
import { FaSearchLocation } from "react-icons/fa";
import userImage from "../imgs/userImage.png";
import logo from "../imgs/motrackLogo.png";
import { API_URL } from "../config";
import { motion as m } from "framer-motion";
import Circle from "../Circle";
import AddCircle from "../AddCircle";

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isInactive, setIsInactive] = useState(false);

  const {
    user,
    token,
    lati,
    long,
    address,
    city,
    state,
    country,
    setLati,
    setLong,
    isOnline,
    setIsOnline,
    logout,
    isCircle,
    setIsCircle,
    isAdd,
    setIsAdd,
    isRequest,
    setIsRequest,
  } = useContext(AuthContext);

  useEffect(() => {
    // Send longitude and latitude request

    const handleLocation = async () => {
      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lat: lati,
          lng: long,
          address,
          city,
          state,
          country,
        }),
      });
      const data = await res.json();

      // console.log(data);
    };

    handleLocation();

    return () => {
      window.removeEventListener("offline", () => {
        setIsOnline(false);
      });
      window.removeEventListener("online", () => {
        setIsOnline(true);
      });
    };
  }, [
    lati,
    long,
    token,
    user.id,
    address,
    city,
    state,
    country,
    isOnline,
    setIsOnline,
  ]);

  const handleIsCircle = () => {
    setIsCircle(true);

    setIsAdd(false);
    setIsRequest(false);
  };

  const handleIsAdd = () => {
    setIsAdd(true);

    setIsCircle(false);
    setIsRequest(false);
  };

  const handleRequest = () => {
    setIsRequest(true);

    setIsCircle(false);
    setIsAdd(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className=" fixed z-10 right-0 left-0">
      <div className=" h-[0rem]">
        <div className=" bg-white backdrop-filter backdrop-blur-md bg-opacity-50 w-[60vw] mx-auto px-[3rem] py-[1rem] flex justify-between items-center rounded-3xl relative top-[2rem] shadow-gray/70 shadow-lg">
          <div className=" ">
            <img src={logo} alt="" className=" w-[5rem]" />
          </div>

          <div className="">
            <form action="" className=" relative flex items-center">
              <input
                type="text"
                id="search"
                name="search"
                placeholder=" Search circle"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className=" bg-white rounded-3xl px-[1rem] py-[0.5rem] w-[40rem]"
              />
              <button className=" bg-primary absolute right-[0.3rem] py-[0.4rem] rounded-3xl w-[2rem] h-[2rem] grid justify-items-center text-light text-xl">
                <FaSearchLocation />
              </button>
            </form>
          </div>

          <div className=" flex items-center ">
            {/* <div className=" px-[2rem] border-r-gray-300 border-r-2 mr-[2rem]">
              <BsFillBellFill className=" text-gray-500 text-xl" />
            </div> */}

            <div className=" flex items-center">
              <img src={userImage} alt="" className=" w-[2rem]" />
            </div>
          </div>
        </div>

        <div className=" w-[4rem] right-0 relative top-[6rem] left-[2rem] items-start justify-start">
          <div
            className={` ${
              isOpen ? "w-[10rem]" : "w-[4rem]"
            } bg-white backdrop-filter backdrop-blur-md bg-opacity-50  grid justify-items-center rounded-3xl py-[2rem] shadow-gray/70 shadow-lg transition-all duration-300 ease-in-out`}
            onMouseEnter={() => handleOpen()}
            onMouseLeave={() => handleClose()}
          >
            <ul
              className={` mx-auto justify-items-center pb-[2rem] relative ${
                isOpen && "px-[0.5rem]"
              } `}
            >
              <li
                className=" text-3xl text-primary_blue hover:bg-primary hover:text-white p-[0.5rem] cursor-pointer transition-all duration-600 ease-in-out rounded-3xl mb-[1rem] flex items-center"
                onClick={() => handleIsAdd()}
              >
                <BsFillPlusCircleFill
                  className={` ${isOpen && "mr-[0.5rem]"}`}
                />
                {isOpen && (
                  <p className={` text-sm font-bold w-[5.5rem]`}>
                    Add to Circle
                  </p>
                )}
              </li>
              <li
                className=" text-3xl text-primary_blue hover:bg-primary hover:text-white p-[0.5rem] cursor-pointer transition-all duration-300 ease-in-out rounded-3xl mb-[1rem] flex items-center"
                onClick={() => handleIsCircle()}
              >
                <TiGroup className={` ${isOpen && "mr-[0.5rem]"}`} />
                {isOpen && (
                  <p className={` text-sm font-bold w-[5.5rem]`}>Circle</p>
                )}
              </li>
              <li
                className=" text-3xl text-primary_blue hover:bg-primary hover:text-white p-[0.5rem] cursor-pointer transition-all duration-300 ease-in-out rounded-3xl mb-[1rem] flex items-center"
                onClick={() => handleRequest()}
              >
                <BsFillBellFill className={` ${isOpen && "mr-[0.5rem]"}`} />
                {isOpen && (
                  <p className={` text-sm font-bold w-[5.5rem]`}>Requests</p>
                )}
              </li>
            </ul>
            <div className="">
              <div
                className=" text-3xl text-red-600 hover:bg-primary hover:text-white p-[0.5rem] cursor-pointer transition-all duration-300 ease-in-out rounded-3xl self-end flex items-center"
                onClick={() => logout()}
              >
                <HiOutlineLogout className={` ${isOpen && "mr-[0.5rem]"}`} />
                {isOpen && (
                  <p className={` text-sm font-bold w-[5.5rem]`}>Logout</p>
                )}
              </div>
            </div>
          </div>
          <div
            className={`${
              isOpen ? "left-[10rem]" : "left-[3rem]"
            } absolute top-0 transition-all duration-300 ease-in-out`}
          >
            {isCircle && <Circle />}
            {isAdd && <AddCircle />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
