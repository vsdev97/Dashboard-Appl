import React from "react";
import PropTypes from "prop-types";
import ReactEcharts from "echarts-for-react";
import Popup from "reactjs-popup";
import {
  AreaChartSvg,
  BarChartSvg,
  DonutChartSvg,
  HorizontalChartSvg,
  LineChartSvg,
  WidgetOptIcon
} from "../../Icons/index";
import { Loader } from "../loader";
import { WidgetComponent } from "./WidgetMain";

export const chartTypes = [
  "area",
  "line",
  "bar",
  "line & bar",
  "pie",
  "donut",
  "horizontal",
  "stack bar",
];
let customChartTypes = chartTypes;

const isMono = localStorage.getItem("monoChrome") === "true";
export const ChartWidgetComponent = (props) => {
  const {
    color,
    renderAs: renderer,
    yAxis,
    series,
    type,
    displayCount,
    config,
    isLoading = false,
    isError = false,
    onEvents,
    hasTopLabels = false,
    rotateXAxisLabel = 0,
    rotateYAxisLabel = 0,
    min,
    max,
    restrictChart = undefined,
    chartMinHeight = "300px",
    isPieLabelVisible = true,
    radiusLevel,
    formatter = undefined,
    noDataText = "No Data",
    chartAnimation,
    dataoptions,
    onSelectDrop,
    axisLabelDecimalPoint,
    displayCountHorizontal,
    pieDLegends = false,
    monoColors,
    isMonoEnable,
    dataPointColorChange = false,
    isLegendsDisplay = true,
    stackBarTotalCount,

    chartName,
    isDataZoom = false,
  } = props;

  if (restrictChart) {
    customChartTypes = restrictChart;
  } else {
    customChartTypes = chartTypes;
  }

  let configWrap = {
    refresh: true,
    chart: true,
    mail: true,
    fileDownload: true,
    screenMax: true,
    dataView: false,
    ...config,
  };

  const [chartType, setChartType] = React.useState(type);

  const defaultOptions = {
    color: isMonoEnable && isMono ? monoColors : color,
    dataZoom: isDataZoom && [
      {
        type: "slider",
        yAxisIndex: [0],
      },
    ],
    xAxis: {
      type: "category",
      showGrid: false,
      boundaryGap: true,
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        lineStyle: {
          color: "#999",
        },
      },
      grid: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      data: [],
    },
    yAxis: {
      type: "value",
      showGrid: false,
      axisTick: {
        show: true,
      },

      axisLine: {
        show: true,
        lineStyle: {
          color: "#999",
        },
      },
      axisLabel: {
        rotate: rotateYAxisLabel,
      },
      splitLine: {
        show: false,
      },
    },
    grid: {
      left: hasTopLabels && pieDLegends ? "12%" : "8%",
      right: "5%",
      bottom: "10%",
      top: "30px",
      containLabel: true,
    },
    legend: {
      show: false,
      icon: "circle",
      orient: "horizontal",
      bottom: "0%",
      width: "100%",
      align: "auto",

      textStyle: {
        fontSize: 12,
        color: "#999",
      },
    },
    tooltip: {},
    series: [],
    label: {
      show: false,
      position: "top",
      color: pieDLegends ? "#fff" : "#999",
    },
  };
  const [chartOptions, setChartOptions] = React.useState({
    ...defaultOptions,
    series,
  });
  const [isChartOption, setIsChartOption] = React.useState(false);
  const [chartOptionPopup, setChartOptionPopup] = React.useState(false);
  const [pieIndex, setPieIndex] = React.useState(0);
  const node = React.useRef();

  const handleChartClick = (e) => {
    if (node?.current?.contains(e.target)) {
      return;
    }
    setIsChartOption(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleChartClick);
    return () => {
      document.removeEventListener("mousedown", handleChartClick);
    };
  }, []);

  React.useEffect(() => {
    let getChartOptions = chartOptions;
    const isPieChart = ["pie", "donut"].includes(chartType);
    const isLineChart = ["line", "area"].includes(chartType);
    const type = isLineChart
      ? "line"
      : isPieChart
      ? "pie"
      : chartType === "horizontal"
      ? "bar"
      : chartType;
    let chartData = [];
    let tmpLineLables = [];
    let tmpBarLables = [];
    let chartLableShow = false;

    let disPlayCount = ["bar", "area", "line", "line & bar", "stack bar"];
    const disPlayCountPie = ["pie", "donut"];

    if (displayCount) {
      if (displayCountHorizontal) {
        disPlayCount = [...disPlayCount, "horizontal"];
      }

      if (chartType === "horizontal" && series?.data?.length <= 1) {
        chartLableShow = true;
      } else chartLableShow = false;

      if (chartType !== "horizontal") {
        chartLableShow = true;
      }
    }

    if (isPieChart) {
      chartData = [
        {
          name: series?.data && series?.data[pieIndex]?.name,
          type,
          label: {
            show: isPieLabelVisible || displayCount,
            position: pieDLegends
              ? "inside"
              : disPlayCountPie?.includes(chartType)
              ? "outside"
              : "top",
            color: pieDLegends ? "#fff" : "#999",
          },

          labelLine: {
            show: true,
          },
          radius: chartType === "pie" ? "60%" : radiusLevel,
          center: pieDLegends ? ["50%", "40%"] : ["50%", "50%"],
          avoidLabelOverlap: true,
          data:
            series?.data &&
            series?.data[pieIndex]?.value?.map((val, i) => ({
              name: `${series.xAxis[i]}`,
              value: val,
              count: series?.count ? `${series?.count[i]}` : "",
              color: pieDLegends ? "var(--g-text-color)" : "#999",
            })),
          animation: chartAnimation,
        },
      ];
      if (formatter) {
        chartData = [
          {
            ...chartData[0],
            label: {
              ...chartData[0]?.label,
              formatter: formatter,
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 15,
            },
          },
        ];
      }
    } else {
      chartData = series?.data?.map((item, i) => {
        if (item.type === "bar") {
          tmpBarLables.push(item.name);
        }
        if (item.type === "line") {
          tmpLineLables.push(item.name);
        }
        let seriess = {
          name: isLegendsDisplay ? item.name : "",
          data: dataPointColorChange
            ? item.value?.map((d, i) => ({
                value: `${d || 0}`,
                itemStyle: {
                  color: color[i],
                },
              }))
            : item.value,
          type: chartType === "line & bar" ? item.type : type,
          label:
            disPlayCount?.includes(chartType) ||
            disPlayCountPie?.includes(chartType)
              ? {
                  show: function (param) {
                    if (param.seriesIndex === 1) {
                      if (stackBarTotalCount) {
                        return param.seriesIndex === 1;
                      } else {
                        return chartLableShow;
                      }
                    } else {
                      return chartLableShow;
                    }
                  },
                  position: disPlayCountPie?.includes(chartType)
                    ? "outside"
                    : chartType === "horizontal"
                    ? "right"
                    : "top",
                  formatter: function (param) {
                    if (param.seriesIndex === chartData.length - 1) {
                      if (stackBarTotalCount) {
                        const valuesSum = chartData.reduce((sum, data) => {
                          const value = data?.data?.[param?.dataIndex] || 0;
                          return sum + value;
                        }, 0);
                        return valuesSum.toString();
                      } else {
                        return param?.data?.value || "";
                      }
                    } else {
                      return "";
                    }
                  },
                }
              : "",
          stack: item?.stack ? item?.stack : "",
          yAxisIndex:
            chartType === "horizontal" || chartType === "pie"
              ? 0
              : item?.yAxisIndex || 0,
          symbolSize: 7,
        };

        if (chartType === "area") seriess.areaStyle = {};
        else if (chartType === "stack bar") {
          seriess.stack = "bar";
          seriess.type = "bar";
        } else if (chartType === "horizontal") {
          seriess.stack = "horizontal";
          seriess.type = "bar";
        }
        return seriess;
      });
    }

    getChartOptions.xAxis = {
      ...defaultOptions.xAxis,
      data: series?.xAxis || [],
      show: isPieChart ? false : true,
      type: chartType === "horizontal" ? "value" : "category",
    };
    if (chartType === "horizontal") {
      getChartOptions.yAxis = {
        ...defaultOptions.yAxis,
        show: isPieChart ? false : true,
        data: chartType === "horizontal" ? series.xAxis : [],
        type: chartType === "horizontal" ? "category" : "value",
        inverse: chartType === "horizontal" ? true : false,
      };
    } else if (chartType === "pie" || chartType === "donut") {
      getChartOptions.yAxis = {
        ...defaultOptions.yAxis,
        show: isPieChart ? false : true,
        data: chartType === "pie" ? series.xAxis : [],
        type: chartType === "pie" ? "category" : "value",
      };
    } else if (yAxis) {
      getChartOptions.yAxis =
        yAxis && Array.isArray(yAxis)
          ? [...yAxis.map((y) => ({ ...defaultOptions.yAxis, ...y }))]
          : { ...defaultOptions.yAxis };
    }

    if (!yAxis || !Array.isArray(yAxis)) {
      getChartOptions.yAxis = {
        ...defaultOptions.yAxis,
        show: isPieChart ? false : true,
        data: chartType === "horizontal" ? series.xAxis : [],
        type: chartType === "horizontal" ? "category" : "value",
        inverse: chartType === "horizontal" ? true : false,
      };
      if ((min || min === 0) && max && chartType !== "horizontal") {
        getChartOptions.yAxis = {
          ...getChartOptions.yAxis,
          min: min,
          max: max,
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: function (value) {
              let cusValue = value;
              if (axisLabelDecimalPoint) {
                cusValue = parseFloat(value?.toString())?.toFixed(
                  axisLabelDecimalPoint
                );
              }

              return cusValue;
            },
          },
        };
      }
      if ((min || min === 0) && max && chartType === "horizontal") {
        getChartOptions.xAxis = {
          ...getChartOptions.xAxis,

          min: min,
          max: max,

          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: function (value) {
              let cusValue = value;
              if (axisLabelDecimalPoint) {
                cusValue = parseFloat(value?.toString())?.toFixed(
                  axisLabelDecimalPoint
                );
              }

              return cusValue;
            },
          },
        };
      }
    }

    getChartOptions.tooltip = {
      ...defaultOptions.tooltip,
      trigger: isPieChart ? "item" : "axis",
      className: "chartTooltip",
      textStyle: {
        fontSize: 13,
      },
    };

    getChartOptions.legend = {
      ...defaultOptions.legend,
      show:
        disPlayCountPie?.includes(chartType) && pieDLegends
          ? true
          : !isPieChart
          ? true
          : false,
    };
    let getSeries = { ...getChartOptions, series: chartData };
    getSeries = { ...getSeries, color: color };
    setChartOptions(getSeries);
  }, [chartType, pieIndex, series, yAxis, color]);

  const handleNavigation = () => {
    setChartOptionPopup(false);
  };

  React.useEffect(() => {
    document.body.addEventListener("scroll", handleNavigation);
    document
      .getElementById("moduleScroll")
      ?.addEventListener("scroll", handleNavigation);

    return () => {
      document.body.removeEventListener("scroll", handleNavigation);
      document
        .getElementById("moduleScroll")
        ?.removeEventListener("scroll", handleNavigation);
    };
  }, []);

  return (
    <WidgetComponent
      headerChildren={
        <React.Fragment>
          {series?.data?.length > 1 &&
            ["pie", "donut", "Line"].includes(chartType) && (
              <select
                className="rounded global_widget border px-1 cursor-pointer"
                style={{
                  borderColor: "var(--border-color)",
                  maxWidth: "115px",
                  minWidth: "90px",
                  background: "var(--kpi-bg)",
                }}
                onChange={(e) => setPieIndex(e.target.value)}
              >
                {series.data.map((label, i) => (
                  <option
                    value={i}
                    key={i}
                    style={{ background: "var(--kpi-bg)" }}
                  >
                    {label.name || "No-options"}
                  </option>
                ))}
              </select>
            )}

          {dataoptions?.length > 0 && (
            <select
              className="rounded global_widget border px-1 cursor-pointer"
              style={{
                borderColor: "var(--border-color)",
                maxWidth: "150px",
                minWidth: "90px",
                background: "var(--kpi-bg)",
              }}
              onChange={(e) => onSelectDrop(e)}
            >
              {dataoptions?.map((val) => {
                return (
                  <option value={val} style={{ background: "var(--kpi-bg)" }}>
                    {val}
                  </option>
                );
              })}
            </select>
          )}

          {configWrap?.chart && (
            <Popup
              trigger={
                <div
                  className="global_togglePopup-root"
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  <WidgetOptIcon size={22} />{" "}
                </div>
              }
              position="bottom right"
              on="click"
              className={"global_popup"}
              closeOnDocumentClick
              open={chartOptionPopup}
              onOpen={() => setChartOptionPopup(true)}
              onClose={() => setChartOptionPopup(false)}
            >
              <div
                className={"global_togglePopup-body"}
                style={{
                  flexDirection: "column",
                }}
              >
                {customChartTypes.map((chart, chartIndex) => {
                  let shouldrender = true;

                  if (
                    (chart === "line & bar" || chart === "stack bar") &&
                    series?.data?.length <= 1
                  ) {
                    shouldrender = false;
                  } else {
                    shouldrender = true;
                  }

                  if (shouldrender) {
                    return (
                      <div
                        className={`global_togglePopup-item ${
                          chartType === chart ? "disableItem" : ""
                        }`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setChartType(chart.toLocaleLowerCase());
                          setIsChartOption(!isChartOption);
                          setChartOptionPopup(false);
                        }}
                        key={chartIndex}
                      >
                        <span
                          className="global_togglePopup-body"
                        >
                          {chart === "area" && <AreaChartSvg />}
                          {chart === "line" && <LineChartSvg />}
                          {chart === "bar" && <BarChartSvg />}
                          {chart === "line & bar" && <LineChartSvg />}
                          {chart === "pie" && <DonutChartSvg />}
                          {chart === "donut" && <DonutChartSvg />}
                          {chart === "horizontal" && <HorizontalChartSvg />}
                          {chart === "stack bar" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              focusable="false"
                              width="1em"
                              height="1em"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 32 32"
                            >
                              <path
                                d="M28 28V6h-8v22h-4V14H8v14H4V2H2v26a2 2 0 0 0 2 2h26v-2zM22 8h4v10h-4zm-12 8h4v6h-4z"
                                fill="currentColor"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className={"global_togglePopup-item-text capitalize"}
                        >
                          {chart} Chart
                        </span>
                      </div>
                    );
                  } else return null;
                })}
              </div>
            </Popup>
          )}
        </React.Fragment>
      }
      isChart
      {...props}
    >
      {(isFullScreen) => (
        <div className="flex-1 flex flex-col w-full items-center justify-start py-4">
          {(isLoading ||
            isError ||
            !series?.xAxis ||
            series?.xAxis.length === 0) && (
            <div
              className="flex flex-col items-center justify-center w-full h-full text-white-500"
              style={{ height: chartMinHeight }}
            >
              {isLoading && <Loader content="loading..." className="pl-2" />}
              {isError && <p className="text-red-500">{isError}</p>}
              {!isLoading &&
                !isError &&
                (!series?.xAxis || series?.xAxis.length === 0) && (
                  <p>{noDataText}</p>
                )}
            </div>
          )}

          {!isLoading &&
            !isError &&
            series?.xAxis &&
            series?.xAxis?.length !== 0 && (
              <ReactEcharts
                // opts={{ renderer }}
                option={{
                  ...chartOptions,
                  xAxis: {
                    ...chartOptions.xAxis,
                    axisLabel: {
                      ...chartOptions.xAxis.axisLabel,
                      rotate: chartName ? 0 : rotateXAxisLabel,
                      minWidth: isFullScreen ? 300 : 200,
                      width: isFullScreen ? 200 : 90,
                      overflow: "truncate",
                    },
                  },
                  yAxis:
                    chartOptions?.yAxis && Array.isArray(chartOptions?.yAxis)
                      ? [
                          ...chartOptions?.yAxis.map((y) => ({
                            ...chartOptions?.yAxis,
                            axisLabel: {
                              ...chartOptions.yAxis.axisLabel,
                              rotate: rotateYAxisLabel,
                              minWidth: isFullScreen ? 500 : 400,
                              width: isFullScreen ? 500 : 150,
                              overflow: "truncate",
                            },
                            ...y,
                          })),
                        ]
                      : {
                          ...chartOptions.yAxis,
                          axisLabel: {
                            ...chartOptions.yAxis.axisLabel,
                            rotate: rotateYAxisLabel,
                            minWidth: isFullScreen ? 500 : 400,
                            width: isFullScreen ? 500 : 150,
                            overflow: "truncate",
                          },
                        },
                }}
                notMerge={true}
                lazyUpdate={true}
                onEvents={onEvents}
                style={{
                  minHeight: chartMinHeight,
                  height: isFullScreen ? "100%" : "auto",
                }}
                className="w-full"
              />
            )}
        </div>
      )}
    </WidgetComponent>
  );
};

ChartWidgetComponent.propTypes = {
  title: PropTypes.string,
  renderAs: PropTypes.oneOf(["svg", "canvas"]),
  type: PropTypes.oneOf(customChartTypes),
  series: PropTypes.any.isRequired,
  rotateXAxisLabel: PropTypes.number,
  rotateYAxisLabel: PropTypes.number,
  radiusLevel: PropTypes.array,
  chartAnimation: PropTypes.bool,
  dataoptions: PropTypes.shape(),
  axisLabelDecimalPoint: PropTypes.number,
  isMonoEnable: PropTypes.bool,
};

ChartWidgetComponent.defaultProps = {
  name: "Chart Title",
  renderAs: "svg",
  type: "bar",
  data: [],
  rotateXAxisLabel: 30,
  rotateYAxisLabel: 0,
  radiusLevel: ["40%", "70%"],
  chartAnimation: true,
  dataoptions: undefined,
  axisLabelDecimalPoint: null,
  isMonoEnable: false,
};