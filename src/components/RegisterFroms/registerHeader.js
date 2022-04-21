import React from "react";
import Header from "../Common/Header";
import Typography from "@mui/material/Typography";

const RegisterHeader = (props) => {
  return (
    <div className="main_register_container">
      <div className="second_register_container">
        <Header />
        <div className="register_content">
          <div className="register_title_container">
            <Typography variant="h3" className="register_title">
              {props.title}
            </Typography>
            <div className="register_subtitle_div">
              <Typography variant="h6" className="register_subtitle">
                {props.subtitle1}
                <br />
                <br />
                {props.subtitle2}
              </Typography>
            </div>
          </div>
          <img className="regsiter_img1" src={props.src} alt="" />
        </div>
      </div>
    </div>
  );
};
export default RegisterHeader;
