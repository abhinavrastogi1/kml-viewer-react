import React, { useEffect, useState } from "react";

function SummaryKmlFile({ geoJson }) {
  const [totalElementsKeys, setTotalElementsKeys] = useState([]);
  const [totalElements, setTotalElements] = useState({});
  const updateElements = {};
//find the no. of elements on each geoJson change
  useEffect(() => {
    geoJson?.features?.forEach((elements) => {
      const type = elements?.geometry?.type;
      if (!updateElements[type]) {
        updateElements[type] = 1;
      } else updateElements[type]++;
    });
    setTotalElements(updateElements);
    setTotalElementsKeys(Object.keys(updateElements));
  }, [geoJson]);

  return (
    <div className="overflow-x-hidden bg-white shadow-md rounded-lg my-4 w-full">
      <table className="w-full table-auto text-left">
        {/* table to show content */}
        <thead className="bg-blue-500  text-white">
          <tr className=" w-[50%]">
            <th className="px-4 py-2 w-[50%]">Geometry Type</th>
            <th className="px-4 py-2 w-[50%]">Count</th>
          </tr>
        </thead>
        <tbody>
          {totalElementsKeys?.map((key) => (
            <tr key={key} className="border-t border-gray-200 ">
              <td className="px-4 py-2 w-[50%]">{key}</td>
              <td className="px-4 py-2 w-[50%]">{totalElements[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SummaryKmlFile;
