import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import Popup from "reactjs-popup";

const CHART_CONTAINER_STYLE = {
  position: "relative",
  width: "100%",
  height: "330px",
  background: "var(--kpi-bg)",
  color: "var(--kpi-text)",
  padding: "10px",
  borderRadius: "10px",
};

const ChartWidget = ({ data, title }) => {
  const chartRef = useRef(null);

  const [chartType, setChartType] = useState("bar"); // Default chart type is bar
  const [chartOptionPopup, setChartOptionPopup] = React.useState(false);
  const [pieIndex, setPieIndex] = React.useState(0);

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
    let options = {};
    switch (chartType) {
      case "bar":
        options = generateBarChartOptions(data, title);
        break;
      case "line":
        options = generateLineChartOptions(data, title);
        break;
      // case "area":
      //   options = generateAreaChartOptions(data, title);
      //   break;
      case "pie":
        options = generatePieChartOptions(data, title);
        break;
      default:
        break;
    }
    return options;
  };

  const generateBarChartOptions = (data, title) => {
    return {
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
        // feature: {
        //   dataView: { readOnly: false },
        //   magicType: { type: ["line", "bar"] },
        //   // restore: {},
        //   saveAsImage: {},
        // },
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
      xAxis: {
        type: "category",
        data: data.categories,
        splitLine: {
          show: false,
        },
        showGrid: false,
      },
      legend: {},
      yAxis: {
        type: "value",
        splitLine: {
          show: false,
        },
        showGrid: false,
      },
      tooltip: {
        show: true,
      },
      series: [
        {
          data: data.values,
          type: "bar",
          color: ["#91ca8c", "#f49f42"],
        },
      ],
    };
  };

  const generateLineChartOptions = (data, title) => {
    return {
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
        // feature: {
        //   dataView: { readOnly: false },
        //   magicType: { type: ["line", "bar"] },
        //   // restore: {},
        //   saveAsImage: {},
        // },
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
      tooltip: {
        show: true,
      },
      series: [
        {
          data: data.values,
          type: "line",
        },
      ],
    };
  };

  const generatePieChartOptions = (data, title) => {
    return {
      title: {
        text: title,
        textStyle: {
          fontSize: "15.75px",
          color: "#E6E6E6",
          fontWeight: "400",
          fontFamily: "ui-sans-serif, system-ui",
        },
      },
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
          // data?.values?.[pieIndex]?.value?.map((val, i) => ({
          //   label: `${data.xAxis[i]}`,
          //   value: val,
          // })),
        },
      ],
    };
  };

  return (
    <div style={CHART_CONTAINER_STYLE}>
      <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
      <Popup
        trigger={
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM11 9v8h2V9h-2zm4 3v5h2v-5h-2zm-8 2v3h2v-3H7z"></path>
              </g>
            </svg>
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
            <button
              onClick={() => {
                handleChartTypeChange("bar");
                close();
              }}
            >
              Bar Chart
            </button>
            <button
              onClick={() => {
                handleChartTypeChange("line");
                close();
              }}
            >
              Line Chart
            </button>
            {/* <button
              onClick={() => {
                handleChartTypeChange("area");
                close();
              }}
            >
              Area Chart
            </button> */}
            <button
              onClick={() => {
                handleChartTypeChange("pie");
                close();
              }}
            >
              Pie Chart
            </button>
          </div>
        )}
      </Popup>
    </div>
  );
};
export default ChartWidget;
