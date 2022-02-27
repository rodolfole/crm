import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import { AppState } from "../interfaces";
import { ClientsPage } from "../pages/ClientsPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import { authStartChecking } from "../redux/actions/authAction";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking } = useSelector(({ AUTH }: AppState) => AUTH);

  useEffect(() => {
    dispatch(authStartChecking());
  }, [dispatch]);

  if (checking) {
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="clients" element={<ClientsPage />} />
        </Route>

        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
