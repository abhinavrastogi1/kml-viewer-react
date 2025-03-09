import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const GeoJsonMap = ({ geoJson }) => {
  const [reRender, setRerender] = useState(0);

  useEffect(() => {
    //for forcing  rerendering of  map to show changes in ui
    setRerender(() => reRender + 1);
  }, [geoJson]);
  return (
    geoJson && (
      <MapContainer
        center={[20, 10]}
        zoom={3}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" /> satelite
        {/* <TileLayer
  url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
/>  streets*/}
        {/* <TileLayer url="https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" />{" "}
        terrain */}
        <GeoJSON data={geoJson} key={reRender} />
      </MapContainer>
    )
  );
};

export default GeoJsonMap;
