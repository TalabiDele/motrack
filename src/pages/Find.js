import React from "react";
import MapComponent from "../components/Map.js/MapComponent";

const Find = () => {
  // const MapComponent = dynamic(
  //   () => {
  //     import("@/components/Map.js/MapComponent");
  //   },
  //   { ssr: false }
  // );

  return (
    <div className="">
      <MapComponent />
    </div>
  );
};

export default Find;
