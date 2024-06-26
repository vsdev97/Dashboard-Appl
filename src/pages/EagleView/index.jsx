import React from "react";

import KpiTwoComponent from "../../components/Kpi/KpiTwo";
import KPIOneComponent from "../../components/Kpi/KpiOne";
import { CalendarIcon, FilterIcon, Three60Icon } from "../../Icons";
import {
  CompliantComponent,
  LastPatchedComponent,
  LinuxComplianceComponent,
  LinuxPatchComponent,
  WindowComplianceComponent,
  WindowPatchComponent,
  LastRebootedComponent,
} from "./ChartWidgets";

const EagleView = () => {
  const kpiData = [
    {
      title: "Windows Patch Compliances",
      windows: [
        { value: "14", label: "Compliant" },
        { value: "22", label: "Non-Compliant" },
      ],
    },
    {
      title: "Linux Patch Compliances",
      windows: [
        { value: "10", label: "Compliant" },
        { value: "30", label: "Non-Compliant" },
      ],
    },
  ];

  return (
    <div className="flex flex-row h-full w-full flex-col" style={{ height: "100vh" }}>
      <div class="flex md:flex-row flex items-center py-3 px-4">
        <span class="pr-3 text-md md:text-md TitleMarginSet truncateText">
          <div class="flex items-center font-semibold gap-3 pl-2">
            <Three60Icon />
            360 View
          </div>
        </span>
        <div class="flex ml-auto">
          <div class="relative inline-block text-left select-none">
            <div
              role="button"
              tabindex="-1"
              class="flex items-center justify-center space-x-2 w-full  rounded  p-2 iconBg"
            >
              <CalendarIcon />
              <span class="cursor-pointer text-sm md:block">Jan 01, 2024 - Apr 03, 2024</span>
            </div>
          </div>
          <div
            class="flex iconBg p-2 rounded cursor-pointer items-center ml-3"
            aria-describedby="popup-1"
          >
            <div class="flex items-center w-full">
              <div>
                <FilterIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="moduleScroll"
        style={{
          height: "100%",
          background: "var(--bg-color)",
          color: "var(--text-color)",
          width: "100%",
          padding: "8px",
          overflowY: "scroll",
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-row justify-between gap-3">
          {kpiData?.map((data, index) => (
            <div
              key={index}
              style={{
                height: "140px",
                width: "100%",
                background: "var(--kpi-bg)",
                color: "var(--kpi-text)",
                borderRadius: "10px",
              }}
            >
              <KpiTwoComponent key={index} data={data.windows} title={data.title} />
            </div>
          ))}
          <div
            style={{
              height: "140px",
              width: "100%",
              background: "var(--kpi-bg)",
              color: "var(--kpi-text)",
              borderRadius: "10px",
            }}
          >
            <KPIOneComponent title="Patch Deployments" data={{ value: "25" }} />
          </div>
          <div
            style={{
              height: "140px",
              width: "100%",
              background: "var(--kpi-bg)",
              color: "var(--kpi-text)",
              borderRadius: "10px",
            }}
          >
            <KPIOneComponent title="Reboots" data={{ value: "0" }} />
          </div>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div
            style={{
              width: "100%",
              height: "400px",
              color: "var(--kpi-text)",
              borderRadius: "10px",
            }}
          >
            <WindowPatchComponent />
          </div>
          <div
            style={{
              width: "100%",
              height: "400px",
              color: "var(--kpi-text)",
              borderRadius: "10px",
            }}
          >
            <LinuxPatchComponent />
          </div>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div
            style={{
              width: "100%",
              height: "400px",
              color: "var(--kpi-text)",
              borderRadius: "10px",
            }}
          >
            <CompliantComponent />
          </div>
          <div
            style={{
              width: "100%",
              height: "400px",
              color: "var(--kpi-text)",
              borderRadius: "10px",
            }}
          >
            <WindowComplianceComponent />
          </div>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div
            style={{
              width: "100%",
              height: "400px",
              color: "var(--kpi-text)",
              borderRadius: "10px",
            }}
          >
            <LinuxComplianceComponent />
          </div>
          <div
            style={{
              width: "100%",
              height: "400px",
              color: "var(--kpi-text)",
              borderRadius: "10px",
            }}
          >
            <LastPatchedComponent />
          </div>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div
            style={{
              width: "50%",
              height: "400px",
              color: "var(--kpi-text)",
              borderRadius: "10px",
            }}
          >
            <LastRebootedComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EagleView;
