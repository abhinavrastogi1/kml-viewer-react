import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom Icon for Marker
const customIcon = new L.Icon({
  iconUrl: "/custom-marker.png", // path to your custom marker image in the public folder
  iconSize: [30, 40], // Size of the marker image
  iconAnchor: [15, 40], // Anchor point of the marker
  popupAnchor: [0, -40], // Position of the popup relative to the marker
});

const GeoJsonMap = ({ geoJson }) => {
  const [reRender, setRerender] = useState(0);

  useEffect(() => {
    // Forcing rerendering of map to show changes in UI
    setRerender(() => reRender + 1);
  }, [geoJson]);

  return (
    geoJson && (
      <MapContainer
        center={[20, 10]}
        zoom={3}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
        <GeoJSON data={geoJson} key={reRender} />
        {/* Add custom marker on the map */}
        <Marker position={[20, 10]} icon={customIcon}>
          <Popup>Custom Marker Popup</Popup>
        </Marker>
      </MapContainer>
    )
  );
};

export default GeoJsonMap;
