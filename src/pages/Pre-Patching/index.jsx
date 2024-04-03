import React from "react";
import Table from "../../components/Table";
// import KpiTwoComponent from "../../components/Kpi/KpiTwo";

const PrePatchng = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Location",
        accessor: "location",
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      { name: "John Doe", age: 30, location: "New York" },
      { name: "Jane Smith", age: 25, location: "Los Angeles" },
      { name: "Bob Johnson", age: 35, location: "Chicago" },
    ],
    [],
  );
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
        <span style={{ fontSize: "16px", fontWeight: "600" }}>Pre-Patching</span>
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
      >
        <div>
          {/* <Table columns={columns} data={data} /> */}
          Welcome to PrePatchng
        </div>
      </div>
    </div>
  );
};

export default PrePatchng;
