import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 0;

  .map-container {
    width: 100%;
    height: 100vh;
  }

  .leaflet-container {
    height: 100vh;
  }

  .leaflet-marker-pane {
    img {
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #ed7d2b;
      padding: 1px;
    }
  }

  .leaflet-left .leaflet-control {
    position: relative;
    z-index: 1000;
  }
`;
