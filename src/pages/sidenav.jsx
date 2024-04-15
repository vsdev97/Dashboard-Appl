import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";

import {
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FiLogOut,
  GiHamburgerMenu,
  EagleView,
  Logo,
  PrePatchng,
  Vulnerability,
  DR_Dashboard,
  SecurityCompliance,
} from "../Icons/index";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const json = [
  { icons: <EagleView />, title: "Eagle View", path: "/dashboard/user" },
  { icons: <PrePatchng />, title: "Pre-Patching", path: "/dashboard/user/prepatching" },
  { icons: <Vulnerability />, title: "Vulnerability", path: "/dashboard/user/vulnerability" },
  { icons: <DR_Dashboard />, title: "DR Dashboard", path: "/dashboard/user/dr_dashboard" },
  {
    icons: <SecurityCompliance />,
    title: "Security and Compliance",
    path: "/dashboard/user/security",
  },
];

export const defaultAsideToggleObj = atom({
  key: "asideMenu",
  default: {
    value: false,
  },
});

const NavBar = ({ handleLogouts, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [theme, setTheme] = React.useState("blue");
  const isMenuOpen = useRecoilValue(defaultAsideToggleObj);
  const updateIsMenuOpen = useSetRecoilState(defaultAsideToggleObj);
  const [isToggleOpen, setIsToggleOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);
  const handleItemClick = (path) => {
    setActiveItem(path);
    setIsOpen(false);
  };

  const handleTheme = (applyTheme) => {
    setTheme(applyTheme);
    localStorage.setItem("theme", applyTheme);
    document.documentElement.setAttribute("data-theme", applyTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("userRole");
    handleLogouts();
    navigate("/");
  };

  //theme toggle with keyboard control keys
  useHotkeys("ctrl+c", () => {
    if (theme === "blue") {
      handleTheme("dark");
    } else if (theme === "dark") {
      handleTheme("light");
    } else {
      handleTheme("blue");
    }
  });

  const toggleLeftMenu = () => {
    updateIsMenuOpen({ value: !isMenuOpen?.value });
    setIsToggleOpen(false);
  };

  React.useEffect(() => {
    const ctheme = localStorage.getItem("theme") || theme;
    handleTheme(ctheme);
  }, [theme]);

  return (
    <div className="flex w-full h-full" style={{ height: "100vh" }}>
      <div
        style={{
          width: isOpen ? "250px" : "60px",
          position: "absolute",
          zIndex: isOpen ? "9999" : "9999",
          height: "100vh",
          backgroundColor: "var(--bg-color)",
        }}
        className="flex-initial"
      >
        <div
          className="top_section flex flex-col gap-2"
          style={{
            height: isToggleOpen ? "200px" : "110px",
          }}
        >
          <div
            style={{ position: "relative" }}
            className="flex flex-row gap-5"
            onClick={() => toggleLeftMenu()}
            onKeyDown={() => toggleLeftMenu()}
          >
            <GiHamburgerMenu onClick={toggle} size={35} />
            <div
              style={{
                display: isOpen ? "block" : "none",
                alignSelf: "center",
              }}
            >
              <Logo size={50} />
            </div>
          </div>

          {/* {userRole && ( */}
          <div className="flex flex-row gap-5">
            <div className="aside_avatar">
              {/* {userRole?.firstname?.charAt(0)}
                {userRole?.lastname?.charAt(0)} */}
              SR
            </div>
            <h1
              style={{
                display: isOpen ? "block" : "none",
                alignSelf: "center",
                color: "var(--hamberger-text)",
              }}
            >
              {/* {userRole.firstname} {userRole.lastname} */}
              Venu Madhav
            </h1>
            <span
              className="ml-auto mini cursor-pointer flex"
              style={{
                alignSelf: "center",
                color: "var(--hamberger-text)",
                display: isOpen ? "block" : "none",
              }}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              onKeyDown={() => setIsToggleOpen(!isToggleOpen)}
              role="button"
              tabIndex={-2}
            >
              {isToggleOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          {/* )} */}
          {isToggleOpen && (
            <div
              className="toggleView"
              style={{
                display: isOpen ? "block" : "none",
              }}
            >
              <div className="flex my-2 ml-2">
                <span
                  className={`theme dark  ${theme === "dark" ? "active" : ""}`}
                  onClick={() => handleTheme("dark")}
                  onKeyDown={() => handleTheme("dark")}
                  role="button"
                  tabIndex={-3}
                >
                  {theme === "dark" && <FaCheck />}{" "}
                </span>
                <span
                  className={`theme blue  ${theme === "blue" ? "active" : ""}`}
                  onClick={() => handleTheme("blue")}
                  onKeyDown={() => handleTheme("blue")}
                  role="button"
                  tabIndex={-4}
                >
                  {theme === "blue" && <FaCheck />}{" "}
                </span>
                <span
                  className={`theme light  ${theme === "light" ? "active" : ""}`}
                  onClick={() => handleTheme("light")}
                  onKeyDown={() => handleTheme("light")}
                  role="button"
                  tabIndex={-5}
                >
                  {theme === "light" && <FaCheck />}{" "}
                </span>
              </div>
              <span
                className="logout"
                onClick={() => handleLogout()}
                onKeyDown={() => handleLogout()}
                role="button"
                tabIndex={-6}
                style={{ color: "var(--hamberger-text)" }}
              >
                <FiLogOut size={28} className="pr-2" /> Logout
              </span>
            </div>
          )}
        </div>
        <div
          style={{
            backgroundColor: "var(--sidebar-bg-color)",
            display: "flex",
            flexDirection: "column",
            height: isToggleOpen ? "calc(110vh - 185px)" : "calc(110vh - 185px)",
          }}
        >
          {json.map((item, index) => (
            <NavLink
              exact
              to={item.path}
              key={index}
              className="link"
              activeClassName={activeItem === item.path ? "active" : ""}
              onClick={() => handleItemClick(item.path)}
            >
              <div className="icon" data-tooltip={item.title}>
                {item.icons}
              </div>
              <div
                style={{
                  display: isOpen ? "block" : "none",
                }}
                className="link_text"
              >
                {item.title}
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      <div
        style={{
          width: "calc(100% - 60px)",
          position: "fixed",
          marginLeft: "60px",
          height: "calc(100vh - 100px)",
        }}
      >
        <div className="flex w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default NavBar;
