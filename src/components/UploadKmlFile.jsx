import React, { useState } from "react";
import * as toGeoJSON from "togeojson";
import GeoJsonMap from "./GeoJsonMap";
import SummaryKmlFile from "./SummaryKmlFile";
import DetailsKmlFile from "./DetailsKmlFile";

const UploadKmlFile = () => {
  const [geoJson, setGeoJson] = useState();
  const [showSummary, setShowSummary] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  //function to upload file and pase it to xml
  const uploadFile = (event) => {
    const file = event?.target.files?.[0];
    if (file) {
      const reader = new FileReader(); // reads file asynchronously
      reader.onload = (e) => {
        if (e.target) {
          const parser = new DOMParser(); // convert string to XML document
          const kmlFile = parser.parseFromString(e.target?.result, "text/xml"); // KML file in XML format

          setGeoJson(toGeoJSON.kml(kmlFile)); // convert KML to GeoJSON
          setFileUploaded(true); // File uploaded, update state
        }
      };
      reader.readAsText(file); // start reading the file
    }
  };

  // Handle toggle visibility for Summary and Details
  const toggleSummary = () => setShowSummary(!showSummary);
  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <>
      {!fileUploaded && (
        //Landing Page
        <div //background img
          className="h-screen flex justify-center items-center bg-cover bg-center"
          style={{
            backgroundSize: "",
            backgroundRepeat: "no-repeat",
            backgroundImage: 'url("/bgImg.jpg")',
          }}
        >
          {/* upload File */}
          <div className="text-center bg-white p-8 rounded-lg shadow-lg bg-opacity-80">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to the KML Viewer
            </h1>
            <input
              type="file"
              accept=".kml"
              onChange={uploadFile}
              className="mb-4 p-4 bg-blue-500 text-white border border-gray-300 rounded shadow-lg cursor-pointer"
            />
            <div className="text-lg font-semibold text-gray-700 text-left pl-3">
              Choose a KML file to upload
            </div>
          </div>
        </div>
      )}
      {/* Home Page */}
      {fileUploaded && (
        <div className="min-h-screen bg-gray-100">
          {/* Navbar */}

          <div className="bg-blue-500 flex text-white shadow-md py-2 px-4">
            <div className="max-w-full mx-4 flex justify-between items-center w-full">
              <div className="text-xl font-semibold">KML Viewer</div>
              <div className="flex space-x-4 w-full justify-end sm:w-[30%] p-2 sm:flex-row flex-col items-center sm:items-center">
                <input
                  type="file"
                  accept=".kml"
                  onChange={uploadFile}
                  className="px-4 py-2 bg-white border-2 border-gray-300 rounded shadow-lg 
                  cursor-pointer text-black mb-2 sm:mb-0 w-full sm:w-auto"
                />
                {/* Summary Button */}
                <button
                  onClick={toggleSummary}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-2 sm:mb-0 w-full sm:w-auto"
                >
                  {showSummary ? "Hide Summary" : "Show Summary"}
                </button>
                {/* Details Button */}
                <button
                  onClick={toggleDetails}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-2 sm:mb-0 w-full sm:w-auto"
                >
                  {showDetails ? "Hide Details" : "Show Details"}
                </button>
              </div>
            </div>
          </div>
          {/* Components Rendering */}
          <div className="p-6">
            <GeoJsonMap geoJson={geoJson} />
            {showSummary && <SummaryKmlFile geoJson={geoJson} />}
            {showDetails && <DetailsKmlFile geoJson={geoJson} />}
          </div>
        </div>
      )}
    </>
  );
};

export default UploadKmlFile;
