// Init
import React, { useEffect } from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import jwt_decode from "jwt-decode";
import { Base64 } from "js-base64";
import "./utils/i18n";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import Cookies from "./components/Landing/Cookies";
import Loader from "./components/Common/FullScreenLoader";

// Files
import Index from "./routes/index";
import "./css/index.css";
const Inter = "Inter";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      xmd: 600,
      md: 768,
      lg: 1024,
      xl: 1650,
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
  const { i18n } = useTranslation();
  const [role, setRole] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const LocaleToken = localStorage.getItem("token");
    i18n.changeLanguage("fr");
    if (LocaleToken) {
      var decoded = jwt_decode(LocaleToken);
      let userdata = JSON.parse(Base64.decode(decoded.userData));
      localStorage.setItem("user", JSON.stringify(userdata));
      setRole(userdata.role);
    }
    setLoading(false);
  }, [role]);
  return (
    <ThemeProvider theme={theme}>
      {!loading ? (
        <div className="App">
          {/* toastify Container for Notification */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={true}
            transition={Flip}
          />
          <Index role={role} />
        </div>
      ) : (
        <Loader />
      )}
      <Cookies />
    </ThemeProvider>
  );
}

// Export
export default App;
