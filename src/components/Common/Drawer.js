import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../../assets/Logo/v.png";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Avatar_dumy from "../../assets/DrawerIcons/Avatar_dumy.svg";
import flag_01 from "../../assets/DrawerIcons/flag_01.svg";
import flag_02 from "../../assets/DrawerIcons/flag_02.svg";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import BasicAvatar from "../Common/BasicAvatar";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

const user = JSON.parse(localStorage.getItem("user"));

const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const useStyles = makeStyles((theme) => ({
    // drawer on site (sizing and colors)
    drawer: {
      display: { xs: "block", xmd: "none" },
      backgroundColor: "#ffffff",

      "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
        border: "none",
      },

      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,

        "@media(max-width: 1366px)": {},
        "@media (max-width:992px)": {
          width: drawerWidth - 40,
        },
        "@media(max-width: 768px)": {},
        "@media(max-width: 600px)": {},
      },
    },
    // drawer on mobile view
    drawerMobile: {
      display: { xs: "block", xmd: "none" },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,
        "@media (max-width:992px)": {
          width: drawerWidth - 40,
        },
      },
    },
    // main content box
    mainBox: {
      flexGrow: 1,
      overflow: "hidden !important",
      backgroundColor: "#fbfbfb !important",
      height: "100% ",
      padding: "3rem 0 !important",
      marginTop: "30px !important",
      width: { xmd: `calc(100% - ${drawerWidth}px)` },
      "@media (max-width:992px)": {
        width: { xmd: `calc(100% - ${drawerWidth - 40}px)` },
      },
    },
    toolBar: {
      "@media (max-width:600px)": {
        display: "none",
      },
    },
  }));
  const classes = useStyles();
  const history = useHistory();

  const { i18n, t } = useTranslation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [active, setActive] = React.useState();

  const drawer = (
    <div>
      <Toolbar />
      {/* drawer list text */}
      <List className="drawer-list">
        {props.routes.map((route, index) => (
          <ListItem
            button
            component={NavLink}
            to={route.layout + route.path}
            key={route.name}
            className={active === index && "selected-item"}
            onClick={() => setActive(index)}
            disabled={route.path === "/InstructorBooking"}
          >
            <ListItemIcon className={active === index ? "iconSelected" : "defaultIcon"}>{route.icon}</ListItemIcon>
            <ListItemText primary={t(route.name)} primaryTypographyProps={{ className: "drawer-list-text" }} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const HandleLogout = () => {
    window.location.reload(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("selectedInstructor");
  };

  return (
    <Box className="main-box">
      <AppBar className="appbar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xmd: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <span>
            <img className="dashboard-logo" src={Logo} alt="" onClick={() => history.push(`/${user.role}/myProfile`)} />
          </span>
          <Typography variant="h7" component="div" className="logo-title">
            PERMISPOP.
          </Typography>
          <Box className="Avatar-appbar">
            <IconButton onClick={HandleLogout} sx={{ paddingTop: "15px" }}>
              <PowerSettingsNewIcon className="power-icon" />
            </IconButton>
            <Divider orientation="vertical" flexItem className="divider" />

            <IconButton className="flag01" onClick={() => i18n.changeLanguage("en")}>
              <img alt="America" src={flag_01} className="flags-appbar" />
            </IconButton>

            <IconButton className="flag02" onClick={() => i18n.changeLanguage("fr")}>
              <img alt="Russia" src={flag_02} className="flags-appbar" />
            </IconButton>
            <IconButton>
              <BasicAvatar showActiveStatus={true} online={true} src={Avatar_dumy} avatarclassName="navbar_avatar" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { xmd: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          className={classes.drawerMobile}
        >
          {drawer}
        </Drawer>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          sx={{
            display: { xs: "none", xmd: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              "@media (max-width:992px)": {
                width: drawerWidth - 40,
              },
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* main content box */}
      <Box component="main" className={classes.mainBox}>
        {props.children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
