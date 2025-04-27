import { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { ToastContainer, toast } from "react-toastify";
import CallTaxiImage from "./assets/call-taxi.png";

import "./App.scss";

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
      <button className="call-taxi-button" onClick={notify}>
        <img src={CallTaxiImage} />
        <span>Taxi</span>
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
