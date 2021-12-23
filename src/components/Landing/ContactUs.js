import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../Common/TextField";
import Button from "../Common/Button";

const ContactUs = () => {
  const handleChange = (e) => {
    console.log("hello", e.target.value);
  };

  return (
    <div className="main_contact_container" id="contactUs">
      <div className="second_contact_container">
        <div className="contact_title_div">
          <Typography variant="h2" align="center" className="contact_title">
            Contact Us
          </Typography>
        </div>
        <div className="contact_subtitle_div">
          <Typography variant="h2" align="center" className="contact_subtitle">
            Fill up the form and we will get back to you within 24 hours
          </Typography>
        </div>
        <Box
          component="form"
          noValidate
          // onSubmit={handleSubmit}
          sx={{ mt: 3, marginLeft: "10%", marginRight: "10%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField label="Full Name" placeholder="Permispop"></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Email"
                placeholder="hello@permispop.com"
                inputLabelStyle="input_label"
                inputLabelProps={{ required: true }}
                handleChange={(e) => handleChange(e)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Phone"
                placeholder="+33 123 4567890"
                inputLabelStyle="input_label"
                inputLabelProps={{ required: true }}
                handleChange={(e) => handleChange(e)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Address"
                placeholder="France"
                inputLabelStyle="input_label"
                inputLabelProps={{ required: true }}
                handleChange={(e) => handleChange(e)}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                placeholder="Write your message here"
                inputLabelStyle="input_label"
                handleChange={(e) => handleChange(e)}
              ></TextField>
            </Grid>
            <Grid
              xs={12}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                type="submit"
                text="Send"
                buttonLableStyle={"btn_main"}
                style={{ marginTop: "24px" }}
                width="16%"
                customWidth1="100%"
                height="48px"
                height2="48px"
              ></Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
export default ContactUs;
