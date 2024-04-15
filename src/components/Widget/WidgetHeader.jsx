import PropTypes from "prop-types";
import React, { useRef } from "react";
import Popup from "reactjs-popup";
import { Loader } from "../loader";
import {
  ChartOptionsIcon,
    DownloadIcon,
    EmailIcon,
  RefreshIcon,
} from "../../Icons";
import { toPng } from "html-to-image";

export const WidgetHeaderComponent = (props) => {
  const {
    title,
    handleRefresh,
    dropDownMobile,
    config,
    headerChildren,
    getIsFullScreen,
    isBurgerMenu = true,
    referingMain,
    headerIcon = undefined,
    isChartOption = true,
    widgetHeaderClass,
    moduleUrl,
    ToolTipText,
    refreshIcon,
    WidgetInfoIcon,
    infoContent,
    IsIcon,
    csvIconShow,
  } = props;
  let configWrap = {
    refresh: true,
    chart: true,
    mail: true,
    fileDownload: true,
    screenMax: true,
    fileEdit: false,
    fileRemove: false,
    wFilter: false,
    ...config,
  };

  const edit = true;

  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const [filterPopup, setFilterPopup] = React.useState(false);
  const [widgetFilterPopup, setWidgetFilterPopup] = React.useState(false);
  const [infoiconOpen, setinfoIcon] = React.useState(false);

  const _handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    getIsFullScreen(!isFullScreen);
    handleCloseFilterPopup();
  };

  const handleCloseFilterPopup = () => {
    setFilterPopup(false);
  };

  const _downloadScreenshot = async () => {
    handleCloseFilterPopup();
    setIsDownloading(true);

    toPng(referingMain.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });

    setIsDownloading(false);
  };
  const _emailExport = () => {
    setIsExporting(true);
    handleCloseFilterPopup();
  };
  const handleNavigation = () => {
    setFilterPopup(false);
    setWidgetFilterPopup(false);
    setinfoIcon(false);
  };

  React.useEffect(() => {
    document.body.addEventListener("scroll", handleNavigation, {
      passive: true,
    });
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
    <React.Fragment>
      <header
        className={`${
          dropDownMobile
            ? "dropDownAlignment"
            : "flex-initial flex items-center justify-between"
        } ${widgetHeaderClass}`}
        style={{ background: "var(--kpi-bg)" }}
        title={infoContent?.short}
      >
        <div className="flex">
          {headerIcon && (
            <span className="pr-1 opacity-70"> {headerIcon} </span>
          )}
          {moduleUrl ? (
            <a href={moduleUrl}>
              {ToolTipText ? (
                <Popup
                  trigger={() => <h3 className="text-lg">{title}</h3>}
                  position="top center"
                  className="kpi-tool-tip"
                  closeOnDocumentClick
                  on="hover"
                >
                  {ToolTipText}
                </Popup>
              ) : (
                <h3 className="text-lg">{title}</h3>
              )}
            </a>
          ) : ToolTipText ? (
            <Popup
              trigger={() => <h3 className="text-lg">{title}</h3>}
              position="top center"
              className="kpi-tool-tip"
              closeOnDocumentClick
              on="hover"
            >
              {ToolTipText}
            </Popup>
          ) : (
            <div className="flex justify-between items-center">
              <h3 className="text-lg">{title}</h3>
            </div>
          )}
        </div>
        <div className="flex space-x-3 items-center ml-auto">
          <div id="infoicon-largescreens">
            {IsIcon && WidgetInfoIcon && (
              <>
                {/* <Popup
                  trigger={() => (
                    <span title="">
                      <InfoIcon />
                    </span>
                  )}
                  position={["bottom right"]}
                  closeOnDocumentClick
                  className="WidgetInfo-popup"
                  on="hover"
                >
                  <span
                    style={{ textAlign: "justify", textJustify: "inter-word" }}
                    title=""
                  >
                    {infoContent.summary}
                  </span>
                </Popup> */}
              </>
            )}
          </div>

          {isFullScreen && (
            <React.Fragment>
              <span
                className="global_togglePopup-item-icon cursor-pointer"
                style={{ fontSize: "25px" }}
                title="Minimize"
                onClick={() => _handleFullScreen()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                  </g>
                </svg>
              </span>
            </React.Fragment>
          )}
          {headerChildren && isChartOption && headerChildren}
          {isDownloading && <Loader className="pl-2" />}
          {configWrap?.refresh && refreshIcon && (
            <div
              className={"pt-1 cursor-pointer"}
              onClick={() => {
                handleRefresh();
                handleCloseFilterPopup();
              }}
            >
              <span className="global_togglePopup-item-icon">
                <RefreshIcon size={18} />
              </span>
            </div>
          )}
          {csvIconShow && !isChartOption && headerChildren}
          {isBurgerMenu && !isDownloading && (
            <Popup
              trigger={
                <div
                  className={`global_togglePopup-root ${
                    isFullScreen &&
                    !configWrap?.refresh &&
                    !configWrap?.fileEdit &&
                    !configWrap?.fileRemove
                      ? "hidden"
                      : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  <ChartOptionsIcon size={26} />{" "}
                </div>
              }
              position="bottom right"
              on="click"
              className={"global_togglePopup"}
              closeOnDocumentClick
              open={filterPopup}
              onOpen={() => setFilterPopup(true)}
              onClose={() => setFilterPopup(false)}
            >
              <div
                className={"global_togglePopup-body"}
                style={{
                  cursor: "pointer",
                  maxHeight: "calc(100vh - 100px)",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: "0.25rem",
                  paddingTop: "0.25rem",
                }}
              >
                {configWrap?.refresh && !refreshIcon && (
                  <div
                    className={"global_togglePopup-item"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: "flex-start",
                      gap: "10px",
                      cursor: "pointer",
                      padding: "0.75rem 1rem",
                    }}
                    onClick={() => {
                      handleRefresh();
                      handleCloseFilterPopup();
                    }}
                  >
                    <span className="global_togglePopup-item-icon">
                      <RefreshIcon />
                    </span>
                    <span className={"global_togglePopup-item-text"}>
                      Refresh
                    </span>
                  </div>
                )}
                {!isFullScreen && configWrap?.screenMax && (
                  <div
                    className={"global_togglePopup-item"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: "flex-start",
                      gap: "10px",
                      cursor: "pointer",
                      padding: "0.75rem 1em",
                    }}
                    onClick={() => _handleFullScreen()}
                  >
                    <React.Fragment>
                      <span className="global_togglePopup-item-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                          width="1em"
                          height="1em"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                          </g>
                        </svg>
                      </span>
                      <span className={"global_togglePopup-item-text"}>
                        Maximize
                      </span>
                    </React.Fragment>
                    {isFullScreen && (
                      <React.Fragment>
                        <span className="global_togglePopup-item-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                            </g>
                          </svg>
                        </span>
                        <span className={"global_togglePopup-item-text"}>
                          Minimize
                        </span>
                      </React.Fragment>
                    )}
                  </div>
                )}

                {edit && configWrap?.fileDownload && (
                  <>
                    <div
                      className={"global_togglePopup-item"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: "flex-start",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "0.75rem 1em",
                      }}
                      onClick={() => _downloadScreenshot()}
                    >
                      <span className="global_togglePopup-item-icon">
                        <DownloadIcon />
                      </span>
                      <span className={"global_togglePopup-item-text"}>
                        Download
                      </span>
                    </div>
                  </>
                )}

                {edit && configWrap?.mail && (
                  <div
                    className={"global_togglePopup-item"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: "flex-start",
                      gap: "10px",
                      cursor: "pointer",
                      padding: "0.75rem 1em",
                    }}
                    onClick={() => _emailExport()}
                  >
                    <span className="global_togglePopup-item-icon">
                      <EmailIcon />
                    </span>
                    <span className={"global_togglePopup-item-text"}>
                      Email
                    </span>
                  </div>
                )}
              </div>
            </Popup>
          )}
          <div id="infoicon-mobile">
          </div>
        </div>
      </header>
      {/* {isExporting && (
        <EmailComponent
          exportref={referingMain}
          filterValues={filterValues}
          close={() => setIsExporting(false)}
          name={typeof title === "string" ? title : titleStr}
        />
      )} */}
    </React.Fragment>
  );
};

WidgetHeaderComponent.propTypes = {
  title: PropTypes.string,
  isBurgerMenu: PropTypes.bool,
  widgetHeaderClass: PropTypes.string,
  moduleUrl: PropTypes.string,
  ToolTipText: PropTypes.string,
  infoIcon: PropTypes.bool,
  ProActiveInfoIcon: PropTypes.bool,
  infoIconText: PropTypes.string,
  WidgetInfoIcon: PropTypes.bool,
  infoContent: PropTypes.object,
};

WidgetHeaderComponent.defaultProps = {
  title: "Chart Title",
  isBurgerMenu: true,
  widgetHeaderClass: "p-4",
  moduleUrl: undefined,
  ToolTipText: undefined,
  infoIcon: false,
  ProActiveInfoIcon: false,
  infoIconText: "",
  WidgetInfoIcon: false,
  infoContent: {},
};