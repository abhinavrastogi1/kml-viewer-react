import * as turf from "@turf/turf";
import React, { useEffect, useState } from "react";
const DetailsKmlFile = ({ geoJson }) => {
  const [lineString, setLineString] = useState([]);
  const [multiLineString, setMultiLineString] = useState([]);
  const [totalLineString, setTotalLineString] = useState(0);
  const [totalMultiLineString, setTotalMultiLineString] = useState(0);
  useEffect(() => {
    const LineStringArr = [];
    const MultilineStringArr = [];
    geoJson?.features.map((element) => {
      const type = element?.geometry?.type;
      if (type == "LineString") {
        LineStringArr.push(element?.geometry);
      } else if (type == "GeometryCollection") {
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
  console.log(multiLineString);
  useEffect(() => {
    if (lineString.length != 0) {
      lineString.forEach((lineString) => {
        const length = turf.length(turf.lineString(lineString?.coordinates), {
          units: "kilometers",
        });
        setTotalLineString((prev) => prev + length);
      });
    }
  }, [lineString]);

  useEffect(() => {
    if (multiLineString.length !== 0) {
      multiLineString.forEach((multiLine) => {
        multiLine.geometries.forEach((geometry) => {
          // Calculate length for valid LineString geometries
          const length = turf.length(
            turf.lineString(geometry.coordinates), // Use lineString instead of multiLineString
            { units: "kilometers" }
          );
          setTotalMultiLineString((prev) => prev + length); // Accumulate total length
        });
      });
    }
  }, [multiLineString]);
  console.log(totalMultiLineString);

  return <></>;
};
export default DetailsKmlFile;

