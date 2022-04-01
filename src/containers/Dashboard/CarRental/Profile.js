import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProfileImage from "../../../components/ProfileComponents/ProfileImage";
import ProfileDetails from "../../../components/ProfileComponents/ProfileDetails";
import Studentprofile from "../../../assets/images/Studentprofile.svg";
import Typography from "@mui/material/Typography";
import Divider from "../../../components/Common/Divider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import TextField from "../../../components/Common/TextField";
import Button from "../../../components/Common/Button";
import API from "../../../api";
import { toast } from "react-toastify";
const Profile = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState();
  const [ratings, setRatings] = useState("");
  const [openmodal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [instructorMeetupPointInfos, setInstructorMeetupPointInfos] =
    useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    getRatings(userData);
    getMeetupPoints(userData);
  }, []);

  const getRatings = async (userData) => {
    await API("get", `FeedBacks/GetAverageRating?id=${userData.id}`).then(
      (res) => {
        setRatings(res.data.data);
      }
    );
  };
  const getMeetupPoints = async (userData) => {
    await API(
      "get",
      `InstructorMeetupPoints/GetMeetUpPoints?id=${userData.id}`
    ).then((res) => {
      console.log("mee", res.data.data.meetUp);

      setInstructorMeetupPointInfos(res.data.data);
    });
  };
  const changePassword = async () => {
    setDisabled(true);
    console.log(
      "test",
      newPassword,
      confirmPassword,
      oldPassword,
      newPassword != "",
      confirmPassword != "",
      oldPassword != ""
    );
    if (newPassword != "" && confirmPassword != "" && oldPassword != "") {
      if (newPassword === confirmPassword) {
        await API(
          "post",
          `Personal/ChangePassword?id=${user.id}&oldPassword=${oldPassword}&newPassword=${newPassword}`
        ).then((res) => {
          toast.success("Password updated Successfully");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setDisabled(false);
          setOpenModal(false);
        });
      } else {
        toast.error("New password does not match Confirm password");
        setDisabled(false);
      }
    } else {
      toast.warning("Cannot accept empty fields");

      setDisabled(false);
    }
  };
  return (
    <>
      <Grid container spacing={1} className="maindiv">
        <Grid md={3} className="leftprofilediv">
          <ProfileImage
            src={user ? (user.photo ? user.photo : { Studentprofile }) : ""}
          ></ProfileImage>
        </Grid>

        <Grid md={9}>
          <ProfileDetails
            name={user ? user.firstName + " " + user.surName : ""}
            location={user ? user.address : ""}
            role={user ? user.role : ""}
            ranking={"Rankings"}
            // value={user? user.}
            openPasswordModal={setOpenModal}
            languages={
              user ? (user.spokenLanguage ? user.spokenLanguage : []) : []
            }
            ratings={ratings ? ratings : ""}
          ></ProfileDetails>
          <Grid className="ProfileDetails">
            <Typography className="Abouttitlle">About</Typography>
            <Divider className="ProfileDivider"></Divider>
          </Grid>
          <Typography className="AboutHeading">Contact Information</Typography>

          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              First Name:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.firstName ? user.firstName : "N/A") : ""}
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Surname:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.surName ? user.surName : "N/A") : ""}
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Gender:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.gender ? user.gender : "N/A") : ""}
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Date of birth:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.dOB ? user.dOB : "N/A") : ""}
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Place of birth:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.placeOfBirth ? user.placeOfBirth : "N/A") : ""}
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Address:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.address ? user.address : "N/A") : ""}
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Complement:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.complement ? user.complement : "N/A") : ""}
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Postal Code:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.zIP ? user.zIP : "N/A") : ""}
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              City:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.city ? user.city : "N/A") : ""}
            </Grid>
          </Grid>
          <Divider className="ProfileDivider" />

          <Typography className="AboutHeading">Contact Information</Typography>
          <Grid container spacing={1} className="formdata">
            {instructorMeetupPointInfos &&
              instructorMeetupPointInfos.map((item, index) => {
                return (
                  <>
                    <Grid sx={12} sm={12} md={4} className="Information">
                      Meetup point {index + 1}:
                    </Grid>
                    <Grid sx={12} sm={12} md={4} className="RoleInformation">
                      {item.meetUp}
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Grid>
        <>
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={openmodal}
            onClose={() => setOpenModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style}>
              <TextField
                label="Old password"
                name="oldPassword"
                value={oldPassword}
                type="password"
                placeholder="Enter password"
                sx={{ marginBottom: "2% !important" }}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
              <TextField
                label="New password"
                name="newPassword"
                value={newPassword}
                type="password"
                placeholder="Enter password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <TextField
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                placeholder="Enter password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div style={{ marginTop: "2%" }}>
                <Button
                  text="Change Password"
                  width="95% !important"
                  color="#149e7a"
                  borderRadius="10px"
                  onClick={changePassword}
                  disabled={disabled}
                ></Button>
              </div>
            </Box>
          </Modal>
        </>
      </Grid>
    </>
  );
};

export default Profile;
