import * as turf from "@turf/turf";
import React, { useEffect, useState } from "react";

const DetailsKmlFile = ({ geoJson }) => {
  const [lineString, setLineString] = useState([]);
  const [multiLineString, setMultiLineString] = useState([]);
  const [totalLineString, setTotalLineString] = useState(0);
  const [totalMultiLineString, setTotalMultiLineString] = useState(0);
  //transform data into useful format
  useEffect(() => {
    const LineStringArr = [];
    const MultilineStringArr = [];
    geoJson?.features?.forEach((element) => {
      const type = element?.geometry?.type;
      if (type === "LineString") {
        LineStringArr.push(element?.geometry);
      } else if (type === "GeometryCollection") {
        const value = element?.geometry.geometries?.every(
          (geometry) => geometry.type === "LineString"
        );
        if (value) {
          MultilineStringArr.push(element?.geometry);
        }
      }
    });
    setLineString(LineStringArr);
    setMultiLineString(MultilineStringArr);
  }, [geoJson]);
  // handles totalLines of String using turf
  useEffect(() => {
    if (lineString.length !== 0) {
      lineString.forEach((line) => {
        const length = turf.length(turf.lineString(line?.coordinates), {
          units: "kilometers",
        });
        setTotalLineString((prev) => prev + length);
      });
    }
  }, [lineString]);
  //handles totalMultiLines of String using turf
  useEffect(() => {
    if (multiLineString.length !== 0) {
      multiLineString.forEach((multiLine) => {
        multiLine.geometries.forEach((geometry) => {
          const length = turf.length(
            turf.lineString(geometry.coordinates), // Using lineString instead of multiLineString
            { units: "kilometers" }
          );
          setTotalMultiLineString((prev) => prev + length);
        });
      });
    }
  }, [multiLineString]);

  return (
    <div className="overflow-x-hidden bg-white shadow-md rounded-lg my-4">
      {/* table of content */}
      <table className="min-w-full table- text-left">
        <thead className="bg-green-500 text-white">
          <tr className="border-t border-gray-200 ">
            <th className="px-4 py-2 w-[50%]">Geometry Type</th>
            <th className="px-4 py-2 w-[50%]">Total Length (km)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-200 ">
            <td className="px-4 py-2 w-[50%]">LineString</td>
            <td className="px-4 py-2 w-[50%]">{totalLineString.toFixed(3)}</td>
          </tr>
          <tr className="border-t border-gray-200 ">
            <td className="px-4 py-2  w-[50%]">MultiLineString</td>
            <td className="px-4 py-2 w-[50%]">
              {totalMultiLineString.toFixed(3)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailsKmlFile;
