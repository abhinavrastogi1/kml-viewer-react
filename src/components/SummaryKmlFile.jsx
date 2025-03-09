import React, { useEffect, useState } from "react";

function SummaryKmlFile({ geoJson }) {
  const [totalElementsKeys, setTotalElementsKeys] = useState([]);
  const [totalElements, setTotalElements] = useState({});
  const updateElements = {};
  useEffect(() => {
    geoJson?.features?.map((elements) => {
      const type = elements?.geometry?.type;
      if (!updateElements[type]) {
        updateElements[type] = 1;
      } else updateElements[type]++;
    });
    setTotalElements(updateElements);
    setTotalElementsKeys(Object.keys(updateElements));
  }, [geoJson]);
  return (
    <>
      <div>
        {totalElementsKeys?.map((key) => (
          <div key={key}>
            {key}:{totalElements[key]}
          </div>
        ))}
      </div>
    </>
  );
}
export default SummaryKmlFile;
