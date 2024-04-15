import React from "react";
import { WidgetHeaderComponent } from "./WidgetHeader";

export const WidgetComponent = (props) => {
  const {
    children,
    isHeader = true,
    chartClass,
    noPadForMain = false,
    isChart = false,
    widgetInnerScroll,
    refreshIcon,
  } = props;
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [showIcon, setShowIcon] = React.useState(false);
  const ref = React.useRef(null);

  return (
    <React.Fragment>
      <section
        style={{
          zIndex: isFullScreen ? 999 : "",
          marginLeft: isFullScreen ? "54px" : "",
        }}
        className={`flex flex-col global_widget h-full ${
          isFullScreen ? "fixed inset-0 isFullScreen" : "rounded"
        }`}
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
        title={props?.infoContent?.short || ""}
      >
        {isHeader && (
          <WidgetHeaderComponent
            {...props}
            referingMain={ref}
            refreshIcon={refreshIcon}
            getIsFullScreen={(value) => setIsFullScreen(value)}
            IsIcon={showIcon}
          />
        )}
        <main
          ref={ref}
          className={`${
            chartClass === "noFlex" ? "" : "flex-1 flex flex-col"
          } ${noPadForMain ? "" : "px-4 pb-4"} global_widget w-full
                    ${widgetInnerScroll ? "overflow-y-auto" : ""}`}
          style={{
            maxHeight: `${
              widgetInnerScroll
                ? isFullScreen
                  ? "calc(100vh - 60px)"
                  : "350px"
                : "auto"
            }`,
            background: "var(--kpi-bg)",
          }}
        >
          {isChart ? children(isFullScreen) : children}
        </main>
      </section>
    </React.Fragment>
  );
};

WidgetComponent.propTypes = {};

WidgetComponent.defaultProps = {};