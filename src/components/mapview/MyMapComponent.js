
import { compose, withProps } from "recompose";
import React from "react";
import ReactDOM from "react-dom";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline
} from "react-google-maps";
// const pathCoordinates = [
//    { lat: 36.05298765935, lng: -112.083756616339 },
//    { lat: 36.2169884797185, lng: -112.056727493181 }
//  ];
const InternalMap = props => (
  <GoogleMap defaultZoom={7} defaultCenter={{ lat: props.pathCoordinates[0].lat, lng: props.pathCoordinates[0].lng }}>
    <Polyline
      path={props.pathCoordinates}
      geodesic={true}
      options={{
        strokeColor: "#ff2527",
                    strokeOpacity: 0.75,
                    strokeWeight: 2,

      }}
    />
  </GoogleMap>
);
const MapHoc = withScriptjs(withGoogleMap(InternalMap));

const MyMapComponent = props => (
  <MapHoc
    googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBp_yhd9zuT070_ZoqKc--7kcUCXzAwMT0&v=3.exp&libraries=geometry,drawing,places'
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    pathCoordinates={props.pathCoordinates}
  />
);




export default MyMapComponent;