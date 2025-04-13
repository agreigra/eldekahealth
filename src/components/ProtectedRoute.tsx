import React from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useGetCurrentUserQuery } from "@/services/authenticationApi";
import Navbar from "./Navbar";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  showNavbar?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  showNavbar = true,
}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const skipQuery = !token;

  const {
    data: user,
    isLoading,
    isError,
  } = useGetCurrentUserQuery(undefined, { skip: skipQuery });

  if (isLoading) {
    return (
      <>
        {showNavbar && <Navbar />}
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-medical-600" />
          <span className="ml-2">Loading...</span>
        </div>
      </>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
