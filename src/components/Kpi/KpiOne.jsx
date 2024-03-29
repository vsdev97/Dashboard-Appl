import React, { useState, useEffect } from "react";
import { Loader } from "../loader";

const KPIOneComponent = ({ data, title }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const fetchData = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating delay
          setLoading(false); // Set loading to false when data is provided
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [data]);

  return (
    <>
      {loading && (
        <div className="flex w-full h-full align-middle justify-center">
          <Loader />
        </div>
      )}
      {!loading && data && (
        <div className="flex flex-col w-full h-full p-4">
          <div>{title}</div>
          <div
            className="flex flex-col justify-center items-center"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>{data.value}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default KPIOneComponent;
