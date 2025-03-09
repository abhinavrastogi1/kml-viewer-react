import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GeoJsonMap = ({ geoJson }) => {
  const [reRender, setRerender] = useState(0);
  const [mapType, setMapType] = useState("satellite"); // Default map type

  useEffect(() => {
    // For forcing rerendering of the map to show changes in UI
    setRerender((prev) => prev + 1);
  }, [geoJson]);

  const handleMapTypeChange = (event) => {
    setMapType(event.target.value); // Update the map type based on dropdown selection
  };

  const getTileLayerUrl = () => {
    switch (mapType) {
      case "satellite":
        return "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
      case "terrain":
        return "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}";
      case "streets":
        return "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
      default:
        return "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"; // Default to satellite
    }
  };

  return (
    geoJson && (
      <div className="flex flex-col items-center">
        {/* Dropdown for selecting map type */}
        <select
          className="mb-4 p-2 rounded-lg border border-gray-300"
          value={mapType}
          onChange={handleMapTypeChange}
        >
          <option value="satellite">Satellite</option>
          <option value="terrain">Terrain</option>
          <option value="streets">Streets</option>
        </select>

        {/* Map */}
        <MapContainer
          center={[20, 10]}
          zoom={3}
          className="w-full h-[600px] sm:h-[400px] lg:h-[600px] xl:h-[800px]"
        >
          <TileLayer url={getTileLayerUrl()} />
          <GeoJSON data={geoJson} key={reRender} />
        </MapContainer>
      </div>
    )
  );
};

export default GeoJsonMap;
