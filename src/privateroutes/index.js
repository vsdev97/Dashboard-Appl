import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // Check authentication status and user role here
  const isAuthenticated = true; // Replace with your actual authentication logic
  const userRole = "user"; // Replace with user's actual role

  // If user is authenticated and has the required role, render the protected routes
  if (isAuthenticated && userRole) {
    return <Outlet />;
  } else {
    // Redirect to login page if not authenticated or if user doesn't have the required role
    return <Navigate to="/" />;
  }
};
export default PrivateRoutes;
