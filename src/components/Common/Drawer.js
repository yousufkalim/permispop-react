import * as React from "react";
import PropTypes from "prop-types";
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
import my_profile from "../../assets/DrawerIcons/my_profile.svg";
import chat from "../../assets/DrawerIcons/chat.svg";
import pending_req from "../../assets/DrawerIcons/pending_req.svg";
import history from "../../assets/DrawerIcons/history.svg";
import booking from "../../assets/DrawerIcons/booking.svg";
import find_instructure from "../../assets/DrawerIcons/find_instructure.svg";
import ins_on_map from "../../assets/DrawerIcons/ins_on_map.svg";
import my_procedure from "../../assets/DrawerIcons/my_procedure.svg";
import disputes from "../../assets/DrawerIcons/disputes.svg";
import my_learning from "../../assets/DrawerIcons/my_learning.svg";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Avatar_dumy from "../../assets/DrawerIcons/Avatar_dumy.svg";
import flag_01 from "../../assets/DrawerIcons/flag_01.svg";
import flag_02 from "../../assets/DrawerIcons/flag_02.svg";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [active, setActive] = React.useState();

  const drawer = (
    <div>
      <Toolbar />

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
        ].map((text, index) => (
          <ListItem
            button
            key={text}
            className={active === index && "selected-item"}
            onClick={() => setActive(index)}
          >
            <ListItemIcon>
              {index === 0 && (
                <img className="drawer-icons" alt="" src={my_profile} />
              )}
              {index === 1 && (
                <img className="drawer-icons" alt="" src={chat} />
              )}
              {index === 2 && (
                <img className="drawer-icons" alt="" src={pending_req} />
              )}
              {index === 3 && (
                <img className="drawer-icons" alt="" src={history} />
              )}
              {index === 4 && (
                <img className="drawer-icons" alt="" src={booking} />
              )}
              {index === 5 && (
                <img className="drawer-icons" alt="" src={find_instructure} />
              )}
              {index === 6 && (
                <img className="drawer-icons" alt="" src={ins_on_map} />
              )}
              {index === 7 && (
                <img className="drawer-icons" alt="" src={my_procedure} />
              )}
              {index === 8 && (
                <img className="drawer-icons" alt="" src={disputes} />
              )}
              {index === 9 && (
                <img className="drawer-icons" alt="" src={my_learning} />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        style={{ backgroundColor: "white", border: "none" }}
        position="fixed"
        sx={{
          zIndex: "10000",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <span>
            <img
              style={{
                marginLeft: "0.9rem",
                position: "relative",
                marginTop: "1rem",
              }}
              className="dashboard-logo "
              src={Logo}
              alt=""
            />
          </span>
          <Typography
            variant="h7"
            component="div"
            style={{
              fontSize: "16px",
              color: "black",
              alignContent: "center",
              fontWeight: "600",
              marginTop: "1rem",
              marginLeft: "7px",
              marginBottom: "1px",
            }}
          >
            PERMISPOP.
          </Typography>
          <Box className="Avatar-appbar">
            <IconButton>
              <PowerSettingsNewIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ margin: "10px" }} />

            <IconButton>
              <img className="flags-appbar" alt="America" src={flag_01} />
            </IconButton>

            <IconButton>
              <img className="flags-appbar" alt="Russia" src={flag_02} />
            </IconButton>

            <IconButton>
              <Tooltip title="My Profile">
                <Avatar alt="HAZA" src={Avatar_dumy} />
              </Tooltip>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          color="#858A96"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          className="drawer-text"
          variant="permanent"
          sx={{
            display: "flex",
            "& .MuiDrawer-paper": {
              marginTop: 2,
              boxSizing: "border-box",
              width: "18%",
              backgroundColor: "#FFFFFF",
              borderColor: "#FFFFFF",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ height: "10px" }} />
        <div className="content-div">
          <Typography className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim
            praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non
            tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
            Amet nisl suscipit adipiscing bibendum est ultricies integer quis.
            Cursus euismod quis viverra nibh cras. Metus vulputate eu
            scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
            at augue. At augue eget arcu dictum varius duis at consectetur
            lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
            elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet.
            Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec
            ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet
            nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus
            euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis
            imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa
            tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At
            augue eget arcu dictum varius duis at consectetur lorem. Velit sed
            ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et
            molestie ac. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Rhoncus dolor purus non enim praesent elementum facilisis
            leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
            hendrerit gravida rutrum quisque non tellus. Convallis convallis
            tellus id interdum velit laoreet id donec ultrices. Odio morbi quis
            commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing
            bibendum est ultricies integer quis. Cursus euismod quis viverra
            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin
            fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
            tincidunt lobortis feugiat vivamus at augue. At augue eget arcu
            dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi
            tincidunt. Lorem donec massa sapien faucibus et molestie ac.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor
            purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim
            praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non
            tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
            Amet nisl suscipit adipiscing bibendum est ultricies integer quis.
            Cursus euismod quis viverra nibh cras. Metus vulputate eu
            scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
            at augue. At augue eget arcu dictum varius duis at consectetur
            lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
            elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet.
            Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec
            ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet
            nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus
            euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis
            imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa
            tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At
            augue eget arcu dictum varius duis at consectetur lorem. Velit sed
            ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et
            molestie ac.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
            Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id
            interdum velit laoreet id donec ultrices. Odio morbi quis commodo
            odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
            est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
            Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
            lobortis feugiat vivamus at augue. At augue eget arcu dictum varius
            duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
            Lorem donec massa sapien faucibus et molestie ac. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
            enim praesent elementum facilisis leo vel. Risus at ultrices mi
            tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque
            non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
            Amet nisl suscipit adipiscing bibendum est ultricies integer quis.
            Cursus euismod quis viverra nibh cras. Metus vulputate eu
            scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
            at augue. At augue eget arcu dictum varius duis at consectetur
            lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac.
          </Typography>
        </div>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
