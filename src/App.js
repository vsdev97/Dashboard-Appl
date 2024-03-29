import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { RecoilRoot } from "recoil";
import "./App.css";
import NavBar from "./pages/sidenav";
import EagleView from "./pages/EagleView/index";
import PrePatchng from "./pages/Pre-Patching/index";
import Vulnerability from "./pages/Vulnerability/index";
import DR_Dashboard from "./pages/DR_Dashboard/index";
import SecurityCompliance from "./pages/Security_Compliance/index";

const PrivateRoute = ({ element, userRole, handleLogouts }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("auth"));
  return isAuthenticated ? (
    <NavBar userRole={userRole} handleLogouts={handleLogouts}>
      {element}
    </NavBar>
  ) : (
    <Navigate to="/" />
  );
};

const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  React.useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, [localStorage.getItem("userRole")]);

  const handleLogouts = () => {
    setUserRole(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("userRole");
  };

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route element={<Login setUserRole={setUserRole} />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route
            path="/dashboard/user"
            element={
              <PrivateRoute
                element={<EagleView />}
                userRole={userRole}
                handleLogouts={handleLogouts}
              />
            }
          />
          <Route
            path="/dashboard/user/prepatching"
            element={
              <PrivateRoute
                element={<PrePatchng />}
                userRole={userRole}
                handleLogouts={handleLogouts}
              />
            }
          />
          <Route
            path="/dashboard/user/vulnerability"
            element={
              <PrivateRoute
                element={<Vulnerability />}
                userRole={userRole}
                handleLogouts={handleLogouts}
              />
            }
          />
          <Route
            path="/dashboard/user/dr_dashboard"
            element={
              <PrivateRoute
                element={<DR_Dashboard />}
                userRole={userRole}
                handleLogouts={handleLogouts}
              />
            }
          />
          <Route
            path="/dashboard/user/security"
            element={
              <PrivateRoute
                element={<SecurityCompliance />}
                userRole={userRole}
                handleLogouts={handleLogouts}
              />
            }
          />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
