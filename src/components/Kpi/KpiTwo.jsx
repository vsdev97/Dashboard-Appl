import React, { useState, useEffect } from "react";
import { Loader } from "../loader";

const KpiTwoComponent = ({ data, title }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      // Simulating data fetching delay
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
          <div style={{ height: "30%" }}>{title}</div>
          <div
            style={{
              height: "70%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "20px",
            }}
          >
            {data?.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{item.value}</div>
                <div style={{ fontSize: "12px" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default KpiTwoComponent;
