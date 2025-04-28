import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const isTokenExpired = (token: string): boolean => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

const ProtectedRoute = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        setIsAuthenticated(false);
        setAuthChecked(true);
        return;
      }

      if (!isTokenExpired(accessToken)) {
        setIsAuthenticated(true);
        setAuthChecked(true);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: localStorage.getItem("refresh_token"),
          }),
        });

        if (!res.ok) throw new Error("Refresh failed");
        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  if (!authChecked) {
    return <div>Loading...</div>; // or a spinner
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
