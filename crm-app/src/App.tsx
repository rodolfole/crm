import { ApolloProvider } from "@apollo/client";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import client from "./config/apollo";
import store from "./redux/store";
import { AppRouter } from "./router/AppRouter";

export default function App() {
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#10c9a3",
      },
      error: {
        main: "#ff0054",
      },
      warning: {
        main: "#ffba47",
      },
      mode: "light",
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <ApolloProvider client={client}>
          <Box display="flex" justifyContent="center" sx={{ height: "100vh" }}>
            <AppRouter />
          </Box>
          <ToastContainer
            autoClose={3000}
            closeOnClick
            draggable
            hideProgressBar
            newestOnTop
            pauseOnFocusLoss
            pauseOnHover
            position="top-right"
            rtl={false}
          />
        </ApolloProvider>
      </ThemeProvider>
    </Provider>
  );
}
