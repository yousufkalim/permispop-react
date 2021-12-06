import React from "react";
import Button from "../Common/Button";
import Search from "../Common/Search";
import TextField from "../Common/TextField";
import Logo from "../../assets/images/logo.svg";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";

const Hero = () => {
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
                  <li>
                    <TextField
                      label="Label"
                      borderRadius="0"
                      variant="standard"
                      color="blue"
                      type="password"
                      placeholder="password"
                    ></TextField>
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
            <Button type="submit" text="Login"></Button>
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
        <div className="hero_subtitle_div">
          <Button
            style={{
              marginRight: "1%",
            }}
            type="submit"
            text="Join Now"
          ></Button>
          <Button
            startIcon={
              <PlayCircleFilledWhiteOutlinedIcon sx={{ color: "#43DAB1" }} />
            }
            type="submit"
            color="white"
            textColor="#252831"
            text="Play Video"
          ></Button>
        </div>
      </div>
    </div>
  );
};
export default Hero;
