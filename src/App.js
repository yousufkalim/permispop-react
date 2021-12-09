// Init
import React from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Files
import Index from "./routes/index";
import "./css/index.css";
const Inter = "Inter";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 600,
      lg: 992,
      xl: 1366,
    },
  },
  typography: {
    fontFamily: Inter,
  },
  palette: {
    primary: {
      main: "#FFA333",
    },
    secondary: {
      main: "#219D7B",
    },
    error: {
      main: "#FD000A",
    },
    blue: "#140772",
    grey: {
      100: "#707070",
    },
    common: {
      white: "#ffff",
    },
    custom: {
      disabled: "#707070",
    },
  },
  shape: {
    borderRadius: 10,
  },
});
theme.shadows[25] = "0px 3px 6px rgba(0, 0, 0, 0.16)";

// Component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* toastify Container for Notification */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={true}
          transition={Flip}
        />

        {/* Routes */}
        <Index />
      </div>
    </ThemeProvider>
  );
}

// Export
export default App;
