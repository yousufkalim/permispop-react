import React from "react";
import Button from "../Common/Button";
import Search from "../Common/Search";
import Logo from "../../assets/images/logo.svg";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const Hero = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="main_hero_container">
      <div className="second_hero_container">
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
                    <a href="#home"> Home </a>
                  </li>
                  <li>
                    <a href="#services"> Services </a>
                  </li>
                  <li>
                    <a href="#contactUs"> Contact Us </a>
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
            <Button display="none" type="submit" text="Login"></Button>
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
        <div className="hero_title_div">
          <Typography variant="h2" align="center" className="hero_title">
            The Revolutionary platform for true Driving education freelancers.
          </Typography>
        </div>
        <div className="hero_subtitle_div">
          <Typography variant="h2" align="center" className="hero_subtitle">
            Join us to enjoy quality driving education
          </Typography>
        </div>
        <div className="hero_subtitle_btn_div">
          <Button
            style={{
              marginRight: "1%",
            }}
            type="submit"
            text="Join Now"
            customWidth1="36%"
            customWidth2="60%"
          ></Button>
          <Button
            startIcon={
              <PlayCircleFilledWhiteOutlinedIcon sx={{ color: "#43DAB1" }} />
            }
            type="submit"
            color="white"
            textColor="#252831"
            text="Play Video"
            customWidth1="36%"
            customWidth2="60%"
          ></Button>
        </div>
      </div>
    </div>
  );
};
export default Hero;
