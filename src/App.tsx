import { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { ToastContainer, toast } from "react-toastify";
import CallTaxiImage from "./assets/call-taxi.png";

import "./App.css";

const App = () => {
  const {
    REACT_APP_GOOGLE_MAP_KEY,
    REACT_APP_GOOGLE_MAP_DEFAULT_LAT,
    REACT_APP_GOOGLE_MAP_DEFAULT_LNG,
  } = import.meta.env;

  const mapId = "taxi-button";

  const defaultPosition = {
    lat: Number(REACT_APP_GOOGLE_MAP_DEFAULT_LAT),
    lng: Number(REACT_APP_GOOGLE_MAP_DEFAULT_LNG),
  };

  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      const newPosition: { lat: number; lng: number } = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setPosition(newPosition);
    });
  }, []);

  const notify = () => toast("Wow so easy!");

  return (
    <APIProvider apiKey={REACT_APP_GOOGLE_MAP_KEY}>
      <ToastContainer />
      <button
        onClick={notify}
        style={{
          background: "#FFD772",
          color: "black",
          cursor: "pointer",
          position: "fixed",
          left: "50%",
          top: "70%",
          marginLeft: "-10rem",
          marginTop: "-2rem",
          width: "20rem",
          height: "4rem",
          zIndex: 1,
          fontSize: "1.5rem",
          border: "2px solid black",
          boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.5)",
        }}
      >
        <img
          src={CallTaxiImage}
          style={{
            width: "1.5rem",
            height: "1.5rem",
          }}
        />
        <span style={{ top: "-0.1rem", left: "0.5rem", position: "relative" }}>
          Taxi
        </span>
      </button>
      <Map
        mapId={mapId}
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={defaultPosition}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Marker position={position} draggable={true} />
      </Map>
    </APIProvider>
  );
};

export default App;
