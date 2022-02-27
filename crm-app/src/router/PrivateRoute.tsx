import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { Footer } from "../components/ui/Footer";
import { Header } from "../components/ui/Header";
import { AppState } from "../interfaces";

export const PrivateRoute = () => {
  const { user } = useSelector(({ AUTH }: AppState) => AUTH);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{ width: "100vw" }}
    >
      <Header />

      <Grid container sx={{ flex: 1 }}>
        <Grid item sm={2}></Grid>
        <Grid item sm>
          {user && user.id ? <Outlet /> : <Navigate to="/" />}
        </Grid>
        <Grid item sm={2}></Grid>
      </Grid>

      <Footer />
    </Box>
  );
};
