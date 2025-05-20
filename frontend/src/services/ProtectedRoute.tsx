import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkTokenWithoutRedirecting, getRolesFromToken } from "../services/Token";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const [token, setToken] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[] | null>(null); // null means "not loaded yet"

  useEffect(() => {
    async function fetchToken() {
      const t = await checkTokenWithoutRedirecting();
      setToken(t);
      if (t) {
        const r = getRolesFromToken(t);
        setRoles(r);
      } else {
        setRoles([]); // no token, no roles
      }
    }
    fetchToken();
  }, []);

  if (roles === null) {
    return null;
  }

  if (!roles.includes(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;