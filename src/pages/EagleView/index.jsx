import React from "react";

import KpiTwoComponent from "../../components/Kpi/KpiTwo";
import KPIOneComponent from "../../components/Kpi/KpiOne";
import ChartWidget from "../../components/Widget/index";
import { Three60Icon } from "../../Icons/index";

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

  const barChartData = {
    categories: ["Jan 2024", "Feb 2024", "Mar 2024"],
    values: [0, 0, 15, 20, 10],
  };

  const lineChartData = {
    categories: ["Jan 2024", "Feb 2024", "Mar 2024"],
    values: [20, 0, 15, 0, 10],
  };

  const patchChartData = {
    categories: ["Jan 2024", "Feb 2024", "Mar 2024"],
    values: [0, 0, 25, 30, 0],
  };
  const complianceChartData = {
    categories: ["Jan 2024", "Feb 2024", "Mar 2024"],
    values: [30, 10, 0, 0, 20],
  };

  const complianceData = {
    categories: ["Jan 2024", "Feb 2024", "Mar 2024"],
    values: [100, 20, 0, 0, 0],
  };

  const countData = {
    categories: ["0-30 Days", "31-60 Days", "61-90 Days", "> 90 Days", "No Data"],
    values: [0, 0, 0, 20, 15],
  };
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
        <Three60Icon /> &nbsp; <span style={{ fontSize: "16px", fontWeight: "600" }}>360 View</span>
      </div>
      <div
        style={{
          height: "100%",
          background: "var(--bg-color)",
          color: "var(--text-color)",
          width: "100%",
          padding: "10px",
          overflowY: "scroll",
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-row  justify-between gap-3">
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
          <ChartWidget data={barChartData} chartType="line" title="Windows Patch Trend" />
          <ChartWidget data={lineChartData} chartType="line" title="Linux Patch Trend" />
        </div>
        <div className="flex flex-row justify-between gap-3">
          <ChartWidget data={patchChartData} chartType="line" title="Compliant Vs Non Compliant" />
          <ChartWidget
            data={complianceChartData}
            chartType="line"
            title="Window Patch Compliance"
          />
        </div>
        <div className="flex flex-row justify-between gap-3">
          <ChartWidget data={complianceData} chartType="bar" title="Linux Patch Compliance" />
          <ChartWidget
            data={countData}
            chartType="bar"
            title="Last Patched - Aging Chart (Count)"
          />
        </div>
      </div>
    </div>
  );
};

export default EagleView;
