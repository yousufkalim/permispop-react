import React from "react";
import Typography from "@mui/material/Typography";
import { TextField } from "../../components/Common/TextField";

const ContactUs = () => {
  return (
    <div className="contact_us_container">
      <div className="contact_us_title_div">
        <Typography variant="h4" align="center" className="contact_us_title">
          Contact Us
        </Typography>
      </div>

      {/* <div className="contact_us_subtitle">
        <Typography variant="h6" align="center" className="contact_us_subtitle">
          Fill the form and we will get back to you in 24 hours
        </Typography>
      </div> */}
    </div>
  );
};

export default ContactUs;
