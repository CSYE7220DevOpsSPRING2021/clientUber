import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from "react-google-maps";
const pathCoordinates = [
  { lat: 36.05298765935, lng: -112.083756616339 },
  { lat: 36.2169884797185, lng: -112.056727493181 }
];
const MyMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBp_yhd9zuT070_ZoqKc--7kcUCXzAwMT0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: 40.7127837, lng: -74.0059413 }}>
    <Polyline
                path={pathCoordinates}
                geodesic={true}
                options={{
                    strokeColor: "#ff2527",
                    strokeOpacity: 0.75,
                    strokeWeight: 2,
                    icons: [
                        {
                            //icon: lineSymbol,
                            offset: "0",
                            repeat: "20px"
                        }
                    ]
                }}
            />
  </GoogleMap>
));

export default MyMapComponent;