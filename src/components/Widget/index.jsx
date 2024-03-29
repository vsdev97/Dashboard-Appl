import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const CHART_CONTAINER_STYLE = {
  position: "relative",
  width: "100%",
  height: "330px",
  background: "var(--kpi-bg)",
  color: "var(--kpi-text)",
  padding: "10px",
  borderRadius: "10px",
};

const ChartWidget = ({ data, title, chartType }) => {
  const chartRef = useRef(null);

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

  const generateOptions = (chartType, data, title) => {
    let options = {};
    switch (chartType) {
      case "bar":
        options = generateBarChartOptions(data, title);
        break;
      case "line":
        options = generateLineChartOptions(data, title);
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
        feature: {
          // dataZoom: {
          //   yAxisIndex: "none",
          // },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          // restore: {},
          saveAsImage: {},
        },
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
      legend: {
        show: true,
        orient: "horizontal",
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
        feature: {
          // dataZoom: {
          //   yAxisIndex: "none",
          // },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar", "pie"] },
          // restore: {},
          saveAsImage: {},
        },
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
      legend: {
        show: true,
        orient: "horizontal",
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

  return <div ref={chartRef} style={CHART_CONTAINER_STYLE}></div>;
};
export default ChartWidget;
