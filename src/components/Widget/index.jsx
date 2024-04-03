import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import Popup from "reactjs-popup";
import {
  WidgetOptIcon,
  ChartOptionsIcon,
  MaximizeIcon,
  BarChartSvg,
  LineChartSvg,
  AreaChartSvg,
  HorizontalChartSvg,
  DonutChartSvg,
  RefreshIcon,
  DownloadIcon,
  EmailIcon,
} from "../../Icons";

const CHART_CONTAINER_STYLE = {
  position: "relative",
  width: "100%",
  height: "330px",
  background: "var(--kpi-bg)",
  color: "var(--kpi-text)",
  padding: "10px",
  borderRadius: "10px",
};

const ChartWidget = ({ data, title, defaultChartType }) => {
  const chartRef = useRef(null);

  const [chartType, setChartType] = useState(defaultChartType || "bar");
  const [chartOptionPopup, setChartOptionPopup] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const options = generateOptions(chartType, data, title);
      chart.setOption(options);
      return () => {
        chart.dispose();
      };
    }
  }, [chartType, data, title]);

  const handleChartTypeChange = (chartType) => {
    setChartType(chartType);
    setChartOptionPopup(false);
  };

  const generateOptions = (chartType, data, title) => {
    const commonOptions = {
      title: {
        text: title,
        textStyle: {
          fontSize: "15.75px",
          color: "#E6E6E6",
          fontWeight: "400",
          fontFamily: "ui-sans-serif, system-ui",
        },
      },
      toolbox: {
        show: true,
        iconStyle: {
          color: "none",
          borderColor: "#B9B8CE",
        },
        z: 6,
        backgroundColor: "transparent",
        borderRadius: 0,
        borderWidth: 0,
        borderColor: "#ccc",
      },
      legend: {
        show: true,
        textStyle: {
          color: "#E6E6E6",
        },
      },
      tooltip: {
        show: true,
      },
    };

    switch (chartType) {
      case "bar":
      case "horizontal":
        return {
          ...commonOptions,
          xAxis: {
            type: chartType === "horizontal" ? "value" : "category",
            data: data.categories,
            splitLine: {
              show: false,
            },
            showGrid: false,
          },
          yAxis: {
            type: chartType === "horizontal" ? "category" : "value",
            splitLine: {
              show: false,
            },
            showGrid: false,
          },
          series: [
            {
              data: data.values,
              type: "bar",
              color: ["#82a66c", "#63bdf6"],
            },
          ],
        };
      case "line":
      case "area":
        return {
          ...commonOptions,
          xAxis: {
            type: "category",
            data: data.categories,
            splitLine: {
              show: false,
            },
            showGrid: false,
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: false,
            },
            showGrid: false,
          },
          series: [
            {
              data: data.values,
              type: chartType === "line" ? "line" : "line",
              areaStyle: chartType === "area" ? {} : null,
            },
          ],
        };
      case "pie":
        return {
          ...commonOptions,
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: data?.values,
            },
          ],
        };
      default:
        return commonOptions;
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <div style={CHART_CONTAINER_STYLE}>
      {refreshing && (
        <div className="w-full h-full flex justify-center items-center absolute inset-0  bg-opacity-75 bg-gray-900">
          Loading...
        </div>
      )}
      <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
      <Popup
        trigger={
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "40px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <WidgetOptIcon />
          </div>
        }
        position="bottom right"
        on="click"
        className={"global_togglePopup"}
        closeOnDocumentClick
        open={chartOptionPopup}
        onOpen={() => setChartOptionPopup(true)}
        onClose={() => setChartOptionPopup(false)}
      >
        {(close) => (
          <div className="global_togglePopup-body">
            <div className="flex items-center gap-1">
              <BarChartSvg /> <span onClick={() => handleChartTypeChange("bar")}>Bar Chart</span>
            </div>
            <div className="flex items-center gap-1">
              <LineChartSvg />
              <span onClick={() => handleChartTypeChange("line")}>Line Chart</span>
            </div>
            <div className="flex items-center gap-1">
              <AreaChartSvg />
              <span onClick={() => handleChartTypeChange("area")}>Area Chart</span>
            </div>
            <div className="flex items-center gap-1">
              <HorizontalChartSvg />
              <span onClick={() => handleChartTypeChange("horizontal")}>Horizontal Chart</span>
            </div>
            <div className="flex items-center gap-1">
              <DonutChartSvg />
              <span onClick={() => handleChartTypeChange("pie")}>Donut Chart</span>
            </div>
          </div>
        )}
      </Popup>

      <Popup
        trigger={
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "6px",
              cursor: "pointer",
            }}
          >
            <ChartOptionsIcon />
          </div>
        }
        position="bottom right"
        on="click"
        className={"global_togglePopup"}
        closeOnDocumentClick
      >
        <div className="global_togglePopup-body">
          <div className="flex items-center gap-1">
            <MaximizeIcon />
            <span>Maximize</span>
          </div>
          <div className="flex items-center gap-1" onClick={handleRefresh}>
            <RefreshIcon />
            <span>Refresh</span>
          </div>
          <div className="flex items-center gap-1">
            <DownloadIcon />
            <span>Download</span>
          </div>
          <div className="flex items-center gap-1">
            <EmailIcon />
            <span>Email</span>
          </div>
        </div>
      </Popup>
    </div>
  );
};
export default ChartWidget;
