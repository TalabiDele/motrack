// import React, { useState, useRef, useContext, useEffect } from "react";
// import { createRoot } from "react-dom/client";
// import AuthContext from "../context/AuthContext";
// import userImage from "../imgs/userImage.png";

// const MyMapComponent = ({ mapOptions }) => {
//   const [map, setMap] = useState();
//   const [highlight, setHighlight] = useState(false);

//   const { user } = useContext(AuthContext);

//   // let person;

//   const ref = useRef();

//   useEffect(() => {
//     setMap(new window.google.maps.Map(ref.current, mapOptions));
//   }, []);

//   const getPerson = (e) => {
//     const person = user.circle.find((f) => f.id === e.id);

//     return person;
//   };

//   const Marker = ({ position, map, children }) => {
//     const markerRef = useRef();
//     const rootRef = useRef();

//     useEffect(() => {
//       if (!rootRef.current) {
//         const container = document.createElement("div");

//         rootRef.current = createRoot(container);

//         markerRef.current = new window.google.maps.marker.AdvancedMarkerView({
//           position,
//           content: container,
//           zIndex: 1,
//         });
//       }
//     }, []);

//     useEffect(() => {
//       rootRef.current.render(children);
//       markerRef.current.position = position;
//       markerRef.current.map = map;
//     }, [map, position, children]);

//     console.log(markerRef);
//   };

//   return (
//     <>
//       <div className=" w-[100%] h-[100vh]" ref={ref} />
//       {map &&
//         user.circle.map((e) => (
//           <Marker key={e.id} map={map} position={{ lat: e.lat, lng: e.lng }}>
//             <div
//               className=" cursor-pointer"
//               // onClick={() => console.log(e.id)}
//               onMouseEnter={() => setHighlight(true)}
//               onMouseLeave={() => setHighlight(false)}
//               onClick={() => console.log(e.id)}
//             >
//               <img
//                 src={e.image ? e.image.url : userImage}
//                 alt=""
//                 className=" w-[4rem] h-[4rem] object-cover p-[2px] border-2 border-primary rounded-full cursor-pointer"
//                 onMouseEnter={() => setHighlight(true)}
//                 onMouseLeave={() => setHighlight(false)}
//               />
//               {highlight && <div className="">{e.username}</div>}
//             </div>
//           </Marker>
//         ))}
//     </>
//   );
// };

// export default MyMapComponent;
