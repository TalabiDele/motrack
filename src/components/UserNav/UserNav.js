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

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { user, token, lati, long } = useContext(AuthContext);

  console.log(user);

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
        }),
      });
      const data = await res.json();

      console.log(data);
    };

    handleLocation();
  }, [lati, long, token, user.id]);

  // console.log(user);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" fixed z-10 top-[2rem] right-0 left-0 bottom-[50rem]">
      <div className=" h-[6rem]">
        <div className="">
          <div className=" bg-white w-[80vw] mx-auto rounded-3xl border-b-gray-200 border-b px-[3rem] py-[1rem] flex justify-between items-center shadow-md">
            <img src={logo} alt="" className=" w-[6rem]" />

            <div className="">
              <form action="" className=" relative flex items-center">
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder=" Search circle"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className=" bg-slate-200 rounded-lg px-[1rem] py-[1rem] w-[40rem]"
                />
                <button className=" absolute right-[0.3rem] bg-primary px-[2rem] py-[0.8rem] rounded-lg text-white text-xl">
                  <FaSearchLocation />
                </button>
              </form>
            </div>

            <div className=" flex items-center ">
              <div className=" px-[2rem] border-r-gray-300 border-r-2 mr-[2rem]">
                <BsFillBellFill className=" text-gray-500 text-2xl" />
              </div>

              <div className=" flex items-center">
                <BsFillPlusCircleFill className=" text-primary rounded-full text-5xl p-[0.3rem] mr-[1rem]" />
                <img src={userImage} alt="" className=" w-[3rem]" />
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[5rem] bg-white rounded-3xl relative top-[5rem] left-[3rem] shadow-md grid justify-items-center">
          <ul className=" mx-auto justify-items-center pt-[1rem] pb-[2rem] items-center grid relative">
            <li className=" text-xl text-primary_blue hover:bg-primary hover:text-white p-[1rem] cursor-pointer transition-all duration-300 ease-in-out rounded-3xl mb-[1rem]">
              <HiStatusOnline />
            </li>
            <li className=" text-xl text-primary_blue hover:bg-primary hover:text-white p-[1rem] cursor-pointer transition-all duration-300 ease-in-out rounded-3xl mb-[1rem]">
              <HiStatusOffline />
            </li>
            <li className=" text-xl text-primary_blue hover:bg-primary hover:text-white p-[1rem] cursor-pointer transition-all duration-300 ease-in-out rounded-3xl mb-[1rem]">
              <TiGroup />
            </li>
            <li className=" text-xl text-primary_blue hover:bg-primary hover:text-white p-[1rem] cursor-pointer transition-all duration-300 ease-in-out rounded-3xl">
              <HiOutlineLogout />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
