import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GeoJsonMap = ({ geoJson }) => {
  const [reRender, setRerender] = useState(0);
  const [mapType, setMapType] = useState(
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
  ); // Default map type

  useEffect(() => {
    // For forcing rerendering of the map to show changes in UI
    setRerender((prev) => prev + 1);
  }, [geoJson]);
  //handle the change in map type
  const handleMapTypeChange = (event) => {
    const selectedMapType = event.target.value;
    let tileUrl = "";
    switch (selectedMapType) {
      case "satellite":
        tileUrl = "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
        break;
      case "terrain":
        tileUrl = "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}";
        break;
      case "streets":
        tileUrl = "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
        break;
      default:
        tileUrl = "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
    }

    setMapType(tileUrl);
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

        {/* Map container or wrapper */}
        <MapContainer
          center={[20, 10]}
          zoom={3}
          className="w-full h-[600px] sm:h-[400px] lg:h-[600px] xl:h-[800px]"
        >
          {/* used to show map type */}
          <TileLayer url={mapType} />
          {/* shows the data on the map */}
          <GeoJSON data={geoJson} key={reRender} />
        </MapContainer>
      </div>
    )
  );
};

export default GeoJsonMap;
