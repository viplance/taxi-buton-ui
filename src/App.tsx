import { APIProvider, Map } from "@vis.gl/react-google-maps";

import "./App.css";

const App = () => {
  const {
    REACT_APP_GOOGLE_MAP_KEY,
    REACT_APP_GOOGLE_MAP_DEFAULT_LAT,
    REACT_APP_GOOGLE_MAP_DEFAULT_LNG,
  } = import.meta.env;

  return (
    <APIProvider apiKey={REACT_APP_GOOGLE_MAP_KEY}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{
          lat: Number(REACT_APP_GOOGLE_MAP_DEFAULT_LAT),
          lng: Number(REACT_APP_GOOGLE_MAP_DEFAULT_LNG),
        }}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
};

export default App;
