import { useLocation } from "react-router-dom";
import Popup from "reactjs-popup";

export const ValueValidation = (value, unit = undefined, isData) => {
  if (isData) {
    if (value === "NaN" || value === 0 || value === "0") {
      return 0;
    } else if (value === undefined || value === null || value === false) {
      return "NA";
    }
    return countFormatter(value, unit);
  } else {
    return "Error";
  }
};

export const countFormatter = (value, unit = undefined) => {
  let customizeCount = value;
  if (unit === "cost") {
    if (Math.abs(Number(value)) >= 1.0e9)
      customizeCount = (Math.abs(Number(value)) / 1.0e9).toFixed(2) + "B";
    else if (Math.abs(Number(value)) >= 1.0e6)
      customizeCount = (Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M";
    // else if (Math.abs(Number(value)) >= 1.0e3) customizeCount = (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K';
    else customizeCount = (value && value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) || 0;
  } else if (unit === "count") {
    customizeCount = (value && value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) || 0;
  } else {
    customizeCount = value || 0;
  }
  return customizeCount;
};

export const useQuery = () => new URLSearchParams(useLocation().search);

export const encodeUri = (data) => encodeURIComponent(data);
export const decodeUri = (data) => decodeURIComponent(data);

export const Tooltip = ({
  label,
  hoverText,
  position = ["top left", "bottom left"],
  icon = false,
}) => (
  <Popup
    trigger={() => <span className={`${icon ? "tooltipIcon" : ""}`}> {label} </span>}
    position={position}
    className="kpi-tool-tip"
    closeOnDocumentClick
    on="hover"
  >
    {hoverText}
  </Popup>
);
