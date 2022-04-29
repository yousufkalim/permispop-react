import React, { useState, useEffect } from "react";
import DataTable from "../../../components/Common/Table";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PendingRequestcolumns } from "../../../utils/tableHeads";
import { pendingRequestsrows } from "../../../utils/tablerows";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";
import DatePicker from "../../../components/Common/DatePicker";
import Divider from "../../../components/Common/Divider";
import MobileViewFilters from "../../../components/Common/MobileViewFilters";
import Button from "../../../components/Common/Button";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import API from "../../../api";
import moment from "moment";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Common/FullScreenLoader";
import { useHistory } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BasicModal from "../../../components/Common/BasicModal";
import Project from "../../../assets/images/form.svg";
import Rating from "../../../assets/images/path2006.svg";

function createData(bookingwith, date, startTime, duration, status, id) {
  return { bookingwith, date, startTime, duration, status, id };
}

const userData = JSON.parse(localStorage.getItem("user"));

const Index = () => {
  const { i18n, t } = useTranslation();
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
  const [pendingRequestsrows, setPendingRequestsrows] = useState([]);
  const [Startvalue, setStartValue] = useState(new Date());
  const [updatefield, SetUpdateField] = useState("");
  const [allBookingsWithUser, setAllBookingsWithUser] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [openDisputeModal, setOpenDisputeModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState();
  const [profileModal, setProfileModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [profileData, setProfileData] = useState("");
  const [commentsData, setCommentsData] = useState("");
  const [chatData, setChatData] = useState("");
  const history = useHistory();

  const handleStartdate = (newValue) => {
    setStartValue(newValue);
  };
  const [Endvalue, setEndValue] = useState(new Date());
  const handleEnddate = (newValue) => {
    setEndValue(newValue);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getPendingRequestData(userData);
    setUser(userData);
  }, []);

  const getPendingRequestData = async (userData) => {
    let allBookings = [];
    await API(
      "get",
      `Bookings/GetBookingsByIdForAllUsers_New?id=${userData.id}&role=${userData.role}&sortvalue=FirstName&sortorder=ascend&QuerySearch.firstName=&pageSize=100&pageNumber=1&startDate=&endDate=`
    ).then(async (GetBookingres) => {
      let studentRes = GetBookingres.data.data.map((booking) => {
        if (userData.id === booking.instructionId) {
          return API("get", `Personal/GetAllById/?id=${booking.studentId}`);
        } else if (userData.id === booking.studentId) {
          return API("get", `Personal/GetAllById/?id=${booking.instructionId}`);
        }
      });
      Promise.all(studentRes).then((res) => {
        res.map((student) => {
          GetBookingres.data.data.map((booking) => {
            if (booking.studentId === student.data.data.id) {
              booking["studentData"] = student.data.data;
              allBookings.push(booking);
            } else if (booking.instructionId === student.data.data.id) {
              booking["studentData"] = student.data.data;
              allBookings.push(booking);
            }
          });
        });
        setAllBookingsWithUser(allBookings);
        setPendingRequestsrows(
          allBookings.map((booking) => {
            return createData(
              booking.studentData.firstName + " " + booking.studentData.surName,
              moment(booking.bookingDate).format("DD/MM/YYYY"),
              booking.startTime,
              booking.duration,
              booking.status,
              booking.id
            );
          })
        );
        setLoading(false);
      });
    });
  };

  const updateStatus = async (id, status) => {
    allBookingsWithUser.map((booking) => {
      if (id === booking.id) {
        setSelectedUserData(booking.studentData);
      }
    });
    if (
      status == t("Complete") ||
      status == t("In progress") ||
      status == t("Closed")
    ) {
      await API(
        "get",
        `Bookings/UpdateBookingsStatus?id=${id}&status=${status}`
      ).then((res) => {
        getPendingRequestData(user);
        toast.success(t("Status is updated successful"));
      });
    } else {
      openDisputeModal = setOpenDisputeModal(true);
    }
  };

  const createDispute = async (id) => {
    const userID = JSON.parse(localStorage.getItem("user"));
    if (updatefield != "" && comment != "") {
      await API("post", `Dispute`, {
        Dispute: updatefield,
        comment: comment,
        InstructorID: user.role === "Student" ? selectedUserData.id : user.id,
        instructorName: user.firstName ? user.firstName : "",
        DisputingFrom: user.role ? user.role : "",
        feedBackDate: new Date(),
        studentName: selectedUserData.firstName
          ? selectedUserData.firstName
          : "",
        studentName: selectedUserData.firstName
          ? selectedUserData.firstName
          : "",
        studentID: user.role === "Student" ? user.id : selectedUserData.id,
      }).then((disputeres) => {
        toast.success(t("Dispute is created sucessfully"));
        SetUpdateField("");
        setComment("");
        setOpenDisputeModal(false);
      });
    } else {
      toast.error(t("Field cannot be empty"));
    }
  };

  const handleProfileModalClose = () => setProfileModal(false);
  const handleCommentModalClose = () => setCommentModal(false);

  const handleProfile = (e) => {
    let selectedBooking = allBookingsWithUser.find((booking) => {
      if (booking.id === e.id) {
        return booking;
      }
    });
    setProfileData(selectedBooking.studentData);
    setProfileModal(true);
  };
  const handleComment = (e) => {
    let selectedBooking = allBookingsWithUser.find((booking) => {
      if (booking.id === e.id) {
        return booking;
      }
    });
    setCommentsData(selectedBooking.studentData);
    setCommentModal(true);
  };
  const handleChat = (e) => {
    let selectedBooking = allBookingsWithUser.find((booking) => {
      if (booking.id === e.id) {
        return booking;
      }
    });
    setChatData(selectedBooking.studentData.id);
    handleChatRoom();
  };
  const handleChatRoom = async () => {
    await API(
      "get",
      `Chat/getorcreatechatroom?userA=${userData.id}&userB=${chatData}`
    )
      .then((ChatroomResponse) => {
        localStorage.setItem(
          "ChatroomId",
          JSON.stringify(ChatroomResponse.data.data.id)
        );
        history.push(`/Instructor/chat`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* <MobileViewFilters title={t("Pending requests")} /> */}
      <div className="Filters">
        <Grid container spacing={1} sx={{ marginTop: "30px" }}>
          <Grid xs={12} sm={6} md={4}>
            <Typography
              sx={{
                marginTop: "20px",
                paddingLeft: "80px",
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 400,
                fontSize: "24px",
                lineHight: "34px",
                /* identical to box height */

                color: "#2A3235",
              }}
            >
              {t("Pending Request")}
            </Typography>
          </Grid>
          {/* <Grid xs={12} sm={6} md={2}>
            <MultipleSelectPlaceholder
              value={["All"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <MultipleSelectPlaceholder
              value={["Filter by receiver"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="Start Date"
              value={Startvalue}
              onChange={handleStartdate}
            ></DatePicker>
          </Grid>

          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="End Date"
              value={Endvalue}
              onChange={handleEnddate}
            ></DatePicker>
          </Grid> */}
        </Grid>
      </div>

      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />

      {loading ? (
        <Loader></Loader>
      ) : (
        <DataTable
          updateStatus={updateStatus}
          data={pendingRequestsrows}
          columns={PendingRequestcolumns}
          SetUpdateField={SetUpdateField}
          user={user}
          handleProfile={handleProfile}
          handleChat={handleChat}
          handleComment={handleComment}
        ></DataTable>
      )}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openDisputeModal}
        onClose={() => setOpenDisputeModal(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontWeight: "550" }}
            >
              {t("Give disputes")}
            </FormLabel>
            <RadioGroup>
              <FormControlLabel
                value="Latedelivery"
                control={<Radio />}
                label={t("Late delivery")}
                onChange={(e) => SetUpdateField(e.target.value)}
              />
              <FormControlLabel
                value="Payment issue"
                control={<Radio />}
                label={t("Payment issue")}
                onChange={(e) => SetUpdateField(e.target.value)}
              />
              <FormControlLabel
                value="Harrasment"
                control={<Radio />}
                label={t("Harrasment")}
                onChange={(e) => SetUpdateField(e.target.value)}
              />
              <FormControlLabel
                value="AbusingLanguage"
                control={<Radio />}
                label={t("Abusing Language")}
                onChange={(e) => SetUpdateField(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
          <Typography
            sx={{
              color: "#110000",
              marginBottom: "3px",
              marginTop: "5%",
              fontWeight: "550",
            }}
          >
            {t("Comments")}
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder={t("Comments")}
            name="comment"
            onChange={(e) => setComment(e.target.name)}
            style={{ width: "100%", borderRadius: "5px", padding: "2%" }}
          />
          <div style={{ marginTop: "2%" }}>
            <Button
              text={t("Create Dispute")}
              width="95% !important"
              color="#149e7a"
              borderRadius="10px"
              onClick={(e) => createDispute(e)}
            ></Button>
          </div>
        </Box>
      </Modal>
      <BasicModal
        open={profileModal}
        onClose={handleProfileModalClose}
        modalboxclassName="profile_modal"
      >
        <div>
          <div className="profile_img_div">
            <img
              src={
                profileData?.photo
                  ? profileData?.photo
                  : profileData.photo === "null" || "undefined"
                  ? profileData
                  : profileData.photo
              }
              alt=""
              className="profile_img"
            />
          </div>
          <div className="profile_text_div">
            <p className="profile_text_left">
              {profileData.firstName} {profileData.surName}
            </p>
          </div>
          <div className="profile_text_div">
            <p
              className="profile_text_right"
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <LocationOnIcon style={{ marginTop: -5, marginLeft: 10 }} />
              {profileData.address}
              {profileData.zip} {profileData.city}
            </p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{profileData.contactEmail}</p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{profileData.gender}</p>
          </div>

          <div className="profile_text_div">
            <p className="profile_text_right">
              {moment(profileData.dob).format("DD/MM/YYYY")}
            </p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{profileData.placeOfBirth}</p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{profileData.complement} </p>
          </div>

          <div className="icons">
            <div className="profile_icons_div">
              <div className="icon_style_div">
                <img src={Project} alt="" />
              </div>
              <div className="popup_text">
                {/* <p className="icons_text1">{profileData.BookingLength}</p> */}
                <p className="icons_text2">Bookings</p>
              </div>
            </div>
            <div className="profile_icons_div">
              <div className="icon_style_div">
                <img src={Rating} alt="" />
              </div>
              <div>
                <p className="icons_text1">
                  {/* {profileData.Rating != "NaN" ? profileData.Rating : "N/A"} */}
                </p>
                <p className="icons_text2">Ratings</p>
              </div>
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default Index;
