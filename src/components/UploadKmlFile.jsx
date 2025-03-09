import React, { useState } from "react";
import * as toGeoJSON from "togeojson";
import GeoJsonMap from "./GeoJsonMap";
import SummaryKmlFile from "./SummaryKmlFile";
import DetailsKmlFile from "./DetailsKmlFile";
const UploadKmlFile = () => {
  const [geoJson, setGeoJson] = useState();
  const uploadFile = (event) => {
    const file = event?.target.files?.[0];
    if (file) {
      const reader = new FileReader(); //reads file asynchronously
      reader.onload = (e) => {
        //after reading do this
        if (e.target) {
          const parser = new DOMParser(); //convert string in xml document
          const kmlFile = parser.parseFromString(e.target?.result, "text/xml"); //kml kile in xml document

          setGeoJson(toGeoJSON.kml(kmlFile));
        }
      };
      reader.readAsText(file); //start reading file
    }
  };
  return (
    <>
      <div>
        <input type="file" accept=".kml" onChange={uploadFile} />
        <GeoJsonMap geoJson={geoJson} />
        <SummaryKmlFile geoJson={geoJson} />
        <DetailsKmlFile geoJson={geoJson} />
      </div>
    </>
  );
};

export default UploadKmlFile;
