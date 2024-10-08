import React from "react";
import { Navigate } from "react-router-dom";
import { handleRememberData } from "../constans/globals";
import jwt_decode from "jwt-decode";
import { errorToast } from "../core/core-index";

// eslint-disable-next-line react/prop-types
export default function AuthenticateRoute({ children }) {
  const current_time = Date.now() / 1000;
  try {
    const authToken = localStorage.getItem("userDetails");
    // const { exp } = jwt_decode(authToken);
    if (!authToken) {
      handleRememberData();
      errorToast("You Can Access Without Login");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    handleRememberData();
    return <Navigate to="/login" replace />;
  }

  return <React.Suspense fallback={<>...</>}>{children}</React.Suspense>;
}
