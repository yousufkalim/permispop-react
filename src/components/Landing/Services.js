import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "../Common/Divider";
import Card from "../Common/Card";
import Button from "../Common/Button";
import service1 from "../../assets/images/services1.svg";
import service2 from "../../assets/images/services2.svg";
import service3 from "../../assets/images/services3.svg";
import dot from "../../assets/images/servicesDot.svg";
import CardImage1 from "../../assets/images/cardImg1.svg";
import CardImage2 from "../../assets/images/cardImg2.svg";
import { ReactComponent as NextIcon } from "../../assets/images/nextIcon.svg";

const Services = () => {
  return (
    <div className="main_services_container">
      <div className="second_services_container">
        <div className="services_title_div">
          <Typography variant="h2" align="center" className="services_title">
            Our Services
          </Typography>
        </div>
        <div className="services_subtitle_div">
          <Typography variant="h2" align="center" className="services_subtitle">
            Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.
          </Typography>
        </div>
        {/*Service Card*/}
        <div className="card_main">
          <div className="card_container_outer">
            <img src={service1} alt="services" className="service_img" />
            <div className="card_container_inner">
              <img src={dot} alt="services" className="dot_img" />
              <Typography variant="h2" className="card_title">
                User Behaviour
              </Typography>
            </div>
            <Typography variant="h2" className="card_subtitle">
              Vestibulum eget augue consectetur, mattis turpis et, luctus eros.
              Aenean luctus varius lacus in imperdiet. Curabitur mi ligula,
              consequat
            </Typography>
          </div>
          <div className="card_container_outer">
            <img src={service2} alt="services" className="service_img" />
            <div className="card_container_inner">
              <img src={dot} alt="services" className="dot_img" />
              <Typography variant="h2" className="card_title">
                Best Time Training
              </Typography>
            </div>
            <Typography variant="h2" className="card_subtitle">
              Vestibulum eget augue consectetur, mattis turpis et, luctus eros.
              Aenean luctus varius lacus in imperdiet. Curabitur mi ligula,
              consequat
            </Typography>
          </div>
          <div className="card_container_outer">
            <img src={service3} alt="services" className="service_img" />
            <div className="card_container_inner">
              <img src={dot} alt="services" className="dot_img" />
              <Typography variant="h2" className="card_title">
                Individual Approach
              </Typography>
            </div>
            <Typography variant="h2" className="card_subtitle">
              Vestibulum eget augue consectetur, mattis turpis et, luctus eros.
              Aenean luctus varius lacus in imperdiet. Curabitur mi ligula,
              consequat
            </Typography>
          </div>
        </div>
        <Divider />
        {/*Code Card*/}
        <div className="code_card_container">
          <div className="code_card_main">
            <Card
              heading="Pop Code"
              subHeading="Online Training That Will Revolution Your Code and License"
              image={CardImage1}
            ></Card>
            <Card
              heading="Highway Code"
              subHeading="The Full Road Code Only For €14.90"
              image={CardImage2}
            ></Card>
          </div>
        </div>
        <div className="highway_code_btn">
          <Button
            endIcon={<NextIcon />}
            text="Access The Highway Code Here"
            height="60px"
            height2="60px"
            height3="60px"
            height4="50px"
            customWidth1="100%"
            customWidth2="100%"
            buttonLableStyle="highway_btn_label"
          ></Button>
        </div>
        <Divider />
      </div>
    </div>
  );
};
export default Services;
