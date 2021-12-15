import React from "react";
import Logo from "../../assets/images/logo.svg";
import Button from "../Common/Button";
import Search from "../Common/Search";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="main-list">
      <div className="flex_rowAlign_center">
        <a href="http://localhost:3000">
          <img className="home-logo img-fluid w-75" src={Logo} alt="" />
        </a>
        <Typography variant="p" className="logo_title">
          PERMISPOP
        </Typography>
        <ul className="list mt-2 text-center">
          <li>
            <ul>
              <li>
                <a href="http://localhost:3000/#home"> Home </a>
              </li>
              <li>
                <a href="http://localhost:3000/#services"> Services </a>
              </li>
              <li>
                <a href="http://localhost:3000/#contactUs"> Contact Us </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="flex_rowAlign_spacebwt">
        <Search></Search>
        <Divider
          orientation="vertical"
          light={true}
          flexItem
          variant="middle"
          sx={{ margin: "10px" }}
          className={"divider"}
        />
        <Button
          display="none"
          type="submit"
          text="Login"
          buttonLableStyle="btn_main"
        ></Button>
        <div className="burger_btn">
          <IconButton
            color="inherit"
            edge="start"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
        <Menu
          className="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose}>Home</MenuItem>
          <MenuItem onClick={handleClose}>Services</MenuItem>
          <MenuItem onClick={handleClose}>Contact Us</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
