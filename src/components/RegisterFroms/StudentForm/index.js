import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Button from "../../Common/Button";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import DoneIcon from "@mui/icons-material/Done";
import Checkbox from "@mui/material/Checkbox";

const StudentForm = (props) => {
  const [checked, setisChecked] = React.useState(false);

  return (
    <div className="student_form_main_container">
      <div className="student_form_second_container">
        <div className="main_registerSub_container">
          <div className="second_registerSub_container">
            <div className="registerSub_title_container">
              <Typography variant="h3" className="registerSub_title">
                Student Identity
              </Typography>
              <Typography variant="h6" className="registerSub_subtitle">
                You can provide all your documents and your NEPH mumber after
                validation of your profile isn’t that awesome? So let’s go, fill
                out the form and validate it!t
              </Typography>
            </div>
          </div>
        </div>
        <Box
          component="form"
          noValidate
          // onSubmit={handleSubmit}
          sx={{
            mt: 3,
            marginLeft: "10%",
            marginRight: "10%",
            marginTop: "70px",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField label="First Name" placeholder="John"></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField label="Surname" placeholder="Smith"></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Address"
                placeholder="102 Street, building 02, NY"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Date of birth"
                placeholder="19-10-1992 "
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Place of birth"
                placeholder="France"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField label="Zip Code" placeholder="712333"></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField label="Gender" placeholder="Male"></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Email"
                placeholder="arslan.alikh@gmail.com"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Second Email"
                placeholder="smart_coolkyo@yahoo.com"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Phone"
                placeholder="+33 123 4567890"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Second Phone"
                placeholder="+33 123 4567890"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField label="City" placeholder="New york"></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField label="Complement" placeholder="Student"></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Password"
                placeholder="**************"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Confirm Password"
                placeholder="**************"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField label="Number of hours" placeholder="44"></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="NEPH Number"
                placeholder="532-3321-111"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Spoken Languages"
                placeholder="English, French"
              ></TextField>
            </Grid>
          </Grid>

          <Divider width="100%" borderColor="#D5E4E8" />

          <Grid container spacing={4} alignItems="flex-end">
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload front of your ID Card/Passport"
                label="front"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload back of your ID Card/Passport"
                label="back"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker title="Upload your profile picture" label="profile" />
            </Grid>
          </Grid>
          <div className="termsConditionsCheckboxContainer">
            <div className="termsConditionsCheckbox">
              <Checkbox
                className="checkbox"
                onClick={(e) => setisChecked(!checked)}
              />
              <Typography
                variant="body1"
                className="termsConditionsCheckboxTitle"
              >
                Click me if you had
              </Typography>
            </div>
          </div>
          {checked ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} sx={{ marginRight: "1%" }}>
                <FilePicker
                  title="Upload Highway code image file"
                  label="back"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  label="Date"
                  placeholder="English, French"
                ></TextField>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
          <div className="termsConditionsCheckbox">
            <Checkbox defaultChecked className="checkbox" />
            <Typography
              variant="body1"
              className="termsConditionsCheckboxTitle"
            >
              Terms & Conditions Applied
            </Typography>
          </div>
          <Grid
            xs={12}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button
              endIcon={<DoneIcon sx={{ color: "#fff" }} />}
              type="submit"
              text="Register"
              buttonLableStyle="btn_main"
              style={{ marginTop: "24px" }}
              width="10%"
              customWidth1="100%"
              height="48px"
              height2="48px"
            ></Button>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
export default StudentForm;
