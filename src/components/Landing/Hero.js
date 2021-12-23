import React from "react";
import Button from "../Common/Button";
import Header from "../Common/Header";
import Typography from "@mui/material/Typography";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import RegisterModal from "./RegisterModal";

const Hero = () => {
  const [Registeropen, setRegisteropen] = React.useState(false);
  const handleRegisterOpen = () => setRegisteropen(true);
  const handleRegisterClose = () => setRegisteropen(false);
  return (
    <div className="main_hero_container">
      <div className="second_hero_container">
        <Header />
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
            buttonLableStyle="btn_main"
            onClick={handleRegisterOpen}
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
            buttonLableStyle="btn_main"
          ></Button>
        </div>
      </div>
      <RegisterModal
        open={Registeropen}
        closebtn={true}
        onClose={handleRegisterClose}
        modalTitle="Register As"
        modalboxclassName="Register_modal"
        modalTitleclassName="Register_title"
      ></RegisterModal>
    </div>
  );
};
export default Hero;
