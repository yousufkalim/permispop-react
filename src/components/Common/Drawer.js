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
import Logo from "../../assets/images/logo.svg";
import { ReactComponent as MyProfile } from "../../assets/DrawerIcons/my_profile.svg";
import { ReactComponent as Chat } from "../../assets/DrawerIcons/chat.svg";
import { ReactComponent as PendingReq } from "../../assets/DrawerIcons/pending_req.svg";
import { ReactComponent as History } from "../../assets/DrawerIcons/history.svg";
import { ReactComponent as Booking } from "../../assets/DrawerIcons/booking.svg";
import { ReactComponent as FindInstructure } from "../../assets/DrawerIcons/find_instructure.svg";
import { ReactComponent as InsOnMap } from "../../assets/DrawerIcons/ins_on_map.svg";
import { ReactComponent as MyProcedure } from "../../assets/DrawerIcons/my_procedure.svg";
import { ReactComponent as Disputes } from "../../assets/DrawerIcons/disputes.svg";
import { ReactComponent as MyLearning } from "../../assets/DrawerIcons/my_learning.svg";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Avatar_dumy from "../../assets/DrawerIcons/Avatar_dumy.svg";
import flag_01 from "../../assets/DrawerIcons/flag_01.svg";
import flag_02 from "../../assets/DrawerIcons/flag_02.svg";
import { makeStyles } from "@mui/styles";

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
      backgroundColor: "#fbfbfb",
      height: "100vh",
      padding: "3rem",

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

  const { window } = props;
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
        {[
          "My Profile",
          "Chat",
          "Pending Requests ",
          "History",
          "Bookings",
          "Find Instructor",
          "Instructor on Map",
          "My Prodedures",
          "Disputes",
          "My Learning",
        ]
          // map for checking which index is active
          .map((text, index) => (
            <ListItem
              button
              key={text}
              className={active === index && "selected-item"}
              onClick={() => setActive(index)}
            >
              {/* drawer list icons */}
              <ListItemIcon
                className={active === index ? "iconSelected" : "defaultIcon"}
              >
                {index === 0 && <MyProfile className="drawer-icons" />}
                {index === 1 && <Chat className="drawer-icons" />}
                {index === 2 && <PendingReq className="drawer-icons" />}
                {index === 3 && <History className="drawer-icons" />}
                {index === 4 && <Booking className="drawer-icons" />}
                {index === 5 && <FindInstructure className="drawer-icons" />}
                {index === 6 && <InsOnMap className="drawer-icons" />}
                {index === 7 && <MyProcedure className="drawer-icons" />}
                {index === 8 && <Disputes className="drawer-icons" />}
                {index === 9 && <MyLearning className="drawer-icons" />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{ className: "drawer-list-text" }}
              />
            </ListItem>
          ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
            <img className="dashboard-logo" src={Logo} alt="" />
          </span>
          <Typography variant="h7" component="div" className="logo-title">
            PERMISPOP.
          </Typography>
          <Box className="Avatar-appbar">
            <IconButton className="power-icon">
              <PowerSettingsNewIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem className="divider" />

            <IconButton className="flag01">
              <img alt="America" src={flag_01} className="flags-appbar" />
            </IconButton>

            <IconButton className="flag02">
              <img alt="Russia" src={flag_02} className="flags-appbar" />
            </IconButton>

            <IconButton>
              <Tooltip title="My Profile">
                <Avatar alt="Profile" src={Avatar_dumy} />
              </Tooltip>
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
          container={container}
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
      <Box component="main" className={classes.mainBox}></Box>
    </Box>
  );
}

export default ResponsiveDrawer;
