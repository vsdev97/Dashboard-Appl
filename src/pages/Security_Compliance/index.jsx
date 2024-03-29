import React from "react";
// import KpiTwoComponent from "../../components/Kpi/KpiTwo";

const SecurityCompliance = () => {
  return (
    <div className="flex h-full w-full flex-col" style={{ height: "100vh" }}>
      <div
        style={{
          height: "65px",
          background: "var(--bg-color)",
          color: "var(--text-color)",
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: "600" }}>Security & Compliance</span>
      </div>
      <div
        style={{
          height: "calc(100vh - 130px)",
          background: "var(--bg-color)",
          color: "var(--text-color)",
          width: "100%",
          padding: "10px",
          overflowY: "scroll",
        }}
        className="flex flex-col gap-3"
      >
        Welcome to Security & Compliance
      </div>
    </div>
  );
};

export default SecurityCompliance;
