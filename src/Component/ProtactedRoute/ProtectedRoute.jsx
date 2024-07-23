import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/aouth", { state: { msg, redirect } });
    }
  }, [user, navigate, msg, redirect]);

// Only render children if user is authenticated
  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
