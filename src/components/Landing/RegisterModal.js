import React from "react";
import BasicModal from "../Common/BasicModal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Divider from "../../components/Common/Divider";
import RegisterStudent from "../../assets/images/RegisterStudent.svg";
import RegisterProfessional from "../../assets/images/RegisterProfessional.svg";

export default function RegisterModal(props) {
  const [register, setRegister] = React.useState(true);

  React.useEffect(() => {
    setRegister(true);
  }, [props.open]);

  return (
    <BasicModal
      open={props.open}
      onClose={props.onClose}
      closebtn={props.closebtn}
      modalTitle={props.modalTitle}
      modalboxclassName={
        register ? props.modalboxclassName : "Professional_modal"
      }
      modalTitleclassName={props.modalTitleclassName}
      {...props.modalProps}
    >
      <Grid container spacing={1} className="RegisterModal">
        {register ? (
          <>
            <Grid sx={10} sm={10} md={5}>
              <Card
                className="card1"
                sx={{
                  width: "90%",
                  padding: "6% 19% 6% 19%",
                  boxShadow: "0px 14px 53px rgba(0, 20, 49, 0.06)",
                  borderRadius: "30px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <CardMedia
                    className="RegisterImg"
                    component="img"
                    image={RegisterStudent}
                    alt="services"
                  />
                  <Typography
                    className="Text_content"
                    sx={{
                      mt: 3,
                      color: "#2F363D",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    Student
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Divider
              className="dividerreg"
              orientation="vertical"
              light={true}
              flexItem
              variant="middle"
              sx={{ marginRight: "30px" }}
            />

            <Grid sx={10} sm={10} md={5}>
              <Card
                className="ProfessionalCard"
                sx={{
                  width: "90%",
                  padding: "6% 19% 6% 19%",

                  color: "#2F363D",
                  boxShadow: "0px 14px 53px rgba(0, 20, 49, 0.06)",
                  borderRadius: "30px",
                  cursor: "pointer",
                }}
                onClick={(e) => setRegister(false)}
              >
                <CardContent>
                  <CardMedia
                    className="RegisterImg"
                    component="img"
                    image={RegisterProfessional}
                    alt="services"
                  />
                  <Typography
                    className="Text_content"
                    sx={{
                      mt: 3,
                      color: "#2F363D",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    Professional
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        ) : (
          <>
            <Grid sx={10} sm={10} md={3}>
              <Card
                className="card1"
                sx={{
                  width: "90%",
                  padding: "6% 19% 6% 19%",

                  boxShadow: "0px 14px 53px rgba(0, 20, 49, 0.06)",
                  borderRadius: "30px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <CardMedia
                    className="RegisterImg"
                    component="img"
                    image={RegisterStudent}
                    alt="services"
                  />
                  <Typography
                    className="Text_content1"
                    sx={{
                      mt: 3,
                      color: "#2F363D",
                      fontSize: "15px",

                      fontWeight: "500",
                    }}
                  >
                    Instructor
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Divider
              className="dividerreg"
              orientation="vertical"
              light={true}
              flexItem
              variant="middle"
              sx={{ marginRight: "30px" }}
            />
            <Grid sx={10} sm={10} md={3}>
              <Card
                className="card1"
                sx={{
                  width: "90%",
                  padding: "6% 19% 6% 19%",
                  color: "#2F363D",
                  boxShadow: "0px 14px 53px rgba(0, 20, 49, 0.06)",
                  borderRadius: "30px",
                  // marginLeft: "30px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <CardMedia
                    className="RegisterImg"
                    component="img"
                    image={RegisterProfessional}
                    alt="services"
                  />
                  <Typography
                    className="Text_content1"
                    sx={{
                      mt: 3,
                      color: "#2F363D",
                      fontSize: "15px",

                      fontWeight: "500",
                    }}
                  >
                    Driving School
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Divider
              className="dividerreg"
              orientation="vertical"
              light={true}
              flexItem
              variant="middle"
              sx={{ marginRight: "30px" }}
            />
            <Grid sx={10} sm={10} md={3}>
              <Card
                className="card1"
                sx={{
                  width: "90%",
                  padding: "6% 19% 6% 19%",

                  color: "#2F363D",
                  boxShadow: "0px 14px 53px rgba(0, 20, 49, 0.06)",
                  borderRadius: "30px",
                  // marginLeft: "30px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <CardMedia
                    className="RegisterImg"
                    component="img"
                    image={RegisterProfessional}
                    alt="services"
                  />
                  <Typography
                    className="Text_content1"
                    sx={{
                      mt: 3,
                      color: "#2F363D",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    Rental Car Agent
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </BasicModal>
  );
}
/* 
    <BasicModal 
      modalBtn="Login"                          // To name the modal button
      modalBtnProps={{}}                        // to pass any built-in props for Modal Button 
      modalclassName                            // to use any customized css class for Modal
      modalProps={{}}                           // to pass any built-in props for Modal
      modalboxclassName=""                      // to use any customized css class for Modal box
      modalboxProps={{}}                        // to pass any built-in props for Modal Box
      closebtn                                  // to use the close button
      closebtnclassName                         // to use any customized css class for close button
      closebtnProps={{}}                        // to pass any built-in props for close Button
      modalTitle="Login to your account"        // to enter the title text
      modalTitleclassName='login_modal_title'   // to use any customized css class for title
      modalTitleProps={{align:"left"}}          // to pass any built-in props for title Typography
    





*/
