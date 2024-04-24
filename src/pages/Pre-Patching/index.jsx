import React, { useEffect, useState } from "react";
import { TableComponent } from "../../components/Table";
import { FilterIcon, ThreeDotIcon } from "../../Icons";
import { IconFileTypeCsv } from "@tabler/icons-react";
import { saveAs } from "file-saver";
import { columns, rows } from "../../constant";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const PrePatchng = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const filteredRows = rows?.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(debouncedSearch.toLowerCase()),
    ),
  );

  const exportToCsv = () => {
    const csvData = [];
    csvData?.push(columns.map((col) => col.name));
    filteredRows.forEach((row) => {
      csvData?.push(columns.map((col) => row[col.key]));
    });
    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "Pre-Patching.csv");
  };

  return (
    <div className="flex w-full flex-col" style={{ height: "100%" }}>
      <div
        style={{
          background: "var(--bg-color)",
          color: "var(--text-color)",
          alignItems: "center",
          padding: "10px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: "600" }}>Pre-Patching</span>
        <div className="flex items-center">
          <input
            className="py-2 rounded bg-[var(--bg-widget-sidebar)] pl-4 border-none"
            type="text"
            placeholder="Search"
            tabindex="0"
            autoComplete="off"
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          {/* <ExportCsvICon /> */}
          <IconFileTypeCsv size={28} onClick={exportToCsv} style={{ paddingLeft: "5px", cursor: "pointer" }} />
          <div
            class="flex iconBg p-2 rounded cursor-pointer items-center ml-3"
            aria-describedby="popup-1"
          >
            <div class="flex items-center w-full">
              <FilterIcon />
            </div>
          </div>
          <ThreeDotIcon />
        </div>
      </div>
      <div
        style={{
          background: "var(--bg-color)",
          color: "var(--text-color)",
          width: "100%",
          padding: "10px",
          overflowY: "hidden",
        }}
      >
        <div>
          <TableComponent columns={columns} rows={filteredRows} />
        </div>
      </div>
    </div>
  );
};
export default PrePatchng;
