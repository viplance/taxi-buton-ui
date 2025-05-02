import { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { ToastContainer, toast } from "react-toastify";
import CallTaxiImage from "./assets/call-taxi.png";
import WaitingImage from "./assets/waiting.png";

import "./App.scss";

type Status = "start" | "waiting";

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
  const [status, setStatus] = useState<Status>("start");

  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      const newPosition: { lat: number; lng: number } = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setPosition(newPosition);
    });
  }, []);

  const callTaxi = () => {
    if (
      defaultPosition.lat === position.lat &&
      defaultPosition.lng === position.lng
    ) {
      toast.error("Please select your location");

      return;
    }

    toast.warning("We are looking for taxi");

    setStatus("waiting");
  };

  const cancel = () => {
    toast.error("Your request has been canceled");

    setStatus("start");
  };

  const markerDragEnd = (e: google.maps.MapMouseEvent) => {
    setPosition({ lat: e.latLng?.lat() || 0, lng: e.latLng?.lng() || 0 });
  };

  return (
    <APIProvider apiKey={REACT_APP_GOOGLE_MAP_KEY}>
      <ToastContainer />
      {status === "start" && (
        <button className="call-taxi-button" onClick={callTaxi}>
          <img src={CallTaxiImage} />
          <span>Taxi</span>
        </button>
      )}
      {status === "waiting" && (
        <button className="cancel-button" onClick={cancel}>
          <img src={WaitingImage} />
          <span>Cancel</span>
        </button>
      )}
      <Map
        mapId={mapId}
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={defaultPosition}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Marker
          position={position}
          draggable={true}
          onDragEnd={markerDragEnd}
        />
      </Map>
    </APIProvider>
  );
};

export default App;
