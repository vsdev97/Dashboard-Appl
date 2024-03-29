import React from "react";
import "./loader-style.css";

export const Loader = ({ className = "", content }) => {
  return (
    <div
      className={`vtx-loader flex items-center justify-center space-x-1 ${className}`}
    >
      <svg
        className="vtx-loader-spinner"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        width="1.2em"
        height="1.2em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <path
            d="M12 22c5.523 0 10-4.477 10-10h-3a7 7 0 0 1-7 7v3z"
            fill="currentColor"
          />
          <path
            d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2z"
            fill="currentColor"
          />
        </g>
      </svg>
      <span
        className={`vtx-loader-content pl-1 ${content ? "block" : "hidden"}`}
      >
        {content}
      </span>
    </div>
  );
};
