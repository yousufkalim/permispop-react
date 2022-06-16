import React, { useState, useEffect } from "react";
import DataTable from "../../../components/Common/Table";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PendingRequestcolumns } from "../../../utils/tableHeads";
import Divider from "../../../components/Common/Divider";
import API from "../../../api";
import { toast } from "react-toastify";
import Button from "../../../components/Common/Button";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import moment from "moment";
import Loader from "../../../components/Common/FullScreenLoader";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BasicModal from "../../../components/Common/BasicModal";
import { useTranslation } from "react-i18next";
import Project from "../../../assets/images/form.svg";
import Rating from "../../../assets/images/path2006.svg";
import MyLearningComponent from "../../../components/Common/MyLearningComponent";
import Ratings from "../../../components/Common/Rating";

import { useHistory } from "react-router-dom";

function createData(bookingwith, date, startTime, duration, status, id) {
  return { bookingwith, date, startTime, duration, status, id };
}
const userData = JSON.parse(localStorage.getItem("user"));

const Index = () => {
  const { i18n, t } = useTranslation();
  const style1 = {
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
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    bgcolor: "background.paper",
    boxShadow: 20,
    borderRadius: "10px",
    p: 3,
  };
  const style3 = {
    position: "absolute",
    top: "55%",
    left: "50%",
    width: "30%",
    height: "70% !important",
    overflow: "scroll",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
  const [pendingRequestsrows, setPendingRequestsrows] = useState([]);
  const [allBookingsWithUser, setAllBookingsWithUser] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Startvalue, setStartValue] = useState(new Date());
  const [openDisputeModal, setOpenDisputeModal] = useState(false);
  const [comment, setComment] = useState("");
  const [profileModal, setProfileModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [profileData, setProfileData] = useState("");
  const [commentsData, setCommentsData] = useState("");
  const [updateBookingId, SetUpdateBookingId] = useState("");
  const [selectedBooking, setSelectedBooking] = useState([]);
  const [lowRating, setLowRating] = useState(false);
  const [selectedRatingValue, setSelectedRatingValue] = useState("");
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [updatefield, SetUpdateField] = useState("");
  const [isSelected, setIsSelected] = useState("");
  const [isSelectedBook, setIsSelectedBook] = useState("");
  const [reminder, setReminder] = useState("");
  const [stop, setStop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const history = useHistory();
  const handleStartdate = (newValue) => {
    setStartValue(newValue);
  };
  const [Endvalue, setEndValue] = useState(new Date());
  const [user, setUser] = useState();
  const handleEnddate = (newValue) => {
    setEndValue(newValue);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);
  useEffect(() => {
    if (allBookingsWithUser.length > 0) handleProfileUpdated();
  }, [stop]);

  useEffect(() => {
    if (userData && currentPage) getPendingRequestData(userData);
  }, [currentPage, userData]);
  const getPendingRequestData = async (userData) => {
    let allBookings = [];
    await API(
      "get",
      `Bookings/GetBookingsByIdForAllUsers_New?id=${userData.id}&role=${userData.role}&sortvalue=FirstName&sortorder=ascend&QuerySearch.firstName=&pageSize=10&pageNumber=${currentPage}&startDate=&endDate=`
    ).then(async (GetBookingres) => {
      setPendingRequestsrows([]);
      setTotalPages(GetBookingres.data.totalPages);
      let studentRes = GetBookingres.data.data.map((booking) => {
        if (userData.id === booking.instructionId) {
          return API("get", `Personal/GetAllById/?id=${booking.studentId}`);
        }
      });
      Promise.all(studentRes).then((res) => {
        GetBookingres.data.data.map((booking) => {
          let userdata = res.find((user) => {
            if (booking.studentId === user.data.data.id) {
              return user;
            } else if (booking.instructionId === user.data.data.id) {
              return user;
            }
          });

          booking["studentData"] = userdata.data.data;
          allBookings.push(booking);
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
        setStop(true);
      });
    });
  };

  const updateStatus = async (id, status) => {
    allBookingsWithUser.map((booking) => {
      if (id === booking.id) {
        setSelectedUserData(booking.studentData);
        setSelectedBooking(booking);
      }
    });
    if (status == "Complete" || status == "In progress") {
      await API("get", `Bookings/UpdateBookingsStatus?id=${id}&status=${status}`).then((res) => {
        getPendingRequestData(user);
        toast.success(t("Status is updated successful"));
        setOpenRatingModal(true);
      });
    } else {
      SetUpdateBookingId(id);

      setOpenDisputeModal(true);
    }
  };

  const createDispute = async (id) => {
    if (updatefield != "" && comment != "") {
      await API("post", `Dispute`, {
        Dispute: updatefield,
        comment: comment,
        InstructorID: user.role === "Student" ? selectedUserData.id : user.id,
        instructorName: user.firstName ? user.firstName : "",
        feedBackDate: new Date(),
        DisputingFrom: user.role ? user.role : "",
        studentName: selectedUserData.firstName ? selectedUserData.firstName : "",
        studentName: selectedUserData.firstName ? selectedUserData.firstName : "",
        studentID: user.role === "Student" ? user.id : selectedUserData.id,
      }).then(async (disputeres) => {
        await API("get", `Bookings/UpdateBookingsStatus?id=${updateBookingId}&status=Dispute`).then((res) => {
          getPendingRequestData(user);
          toast.success(t("Dispute is created sucessfully"));

          SetUpdateField("");
          setComment("");
          setOpenDisputeModal(false);
        });
      });
    } else {
      toast.error(t("Field cannot be empty"));
    }
  };
  const handleProfileModalClose = () => {
    setIsSelected("");
    setProfileModal(false);
  };
  const handleCommentModalClose = () => {
    setIsSelectedBook("");
    setCommentModal(false);
  };
  const handleProfileUpdated = async () => {
    // setLoading(true);
    let insdata = allBookingsWithUser.filter((item) => item?.studentData?.profileInfo?.status !== "Deleted");
    let Profile = insdata?.map((item) => {
      if (
        // item.studentData.role === "CarRentalAgent" ||
        // item.studentData.role === "Instructor" ||
        item.studentData.role === "Student"
      ) {
        return API("get", `Bookings/GetBookingsByInstructor?id=${item.studentData.id}`).then((GetBookingsByInstructor) => {
          let newProfile = item;
          newProfile.studentData["BookingLength"] = GetBookingsByInstructor.data.data.length;
          return newProfile;
        });
      } else if (item.studentData.role === "DrivingSchool") {
        return API("get", `Bookings/GetBookingsByDrivingSchool?id=${item.id}`).then((GetBookingsByDrivingSchool) => {
          let newProfile = item;
          newProfile.studentData["BookingLength"] = GetBookingsByDrivingSchool.data.data.length;
          return newProfile;
        });
      }
    });
    Promise.all(Profile).then(async (e) => {
      let newnewProfile = e?.map((pro) => {
        return API("get", `FeedBacks/GetAverageRating?id=${pro?.studentData?.id}`).then((GetAverageRatingResponse) => {
          let newProfile = pro;
          newProfile.studentData["Rating"] = GetAverageRatingResponse?.data?.data;
          return newProfile;
        });
      });
      Promise.all(newnewProfile).then((n) => {
        setAllBookingsWithUser(n);
        // setLoading(false);
      });
    });
  };
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
    // setChatData(selectedBooking.studentData.id);
    handleChatRoom(selectedBooking.studentData.id);
  };
  const handleChatRoom = async (userB) => {
    await API("get", `Chat/getorcreatechatroom?userA=${userData.id}&userB=${userB}`)
      .then((ChatroomResponse) => {
        localStorage.setItem("ChatroomId", JSON.stringify(ChatroomResponse.data.data.id));
        history.push(`/DsInstructor/chat`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRatingValue = (e) => {
    if (e.target.value <= 3) {
      setLowRating(true);
    } else {
      setLowRating(false);
    }
    setSelectedRatingValue(e.target.value);
  };

  const handleRating = async () => {
    if (selectedRatingValue === "" || selectedRatingValue === 0) {
      toast.warning(t("Rating cannot be zero"));
    } else if (reminder === "") {
      toast.warning(t("Reminder cannot be empty"));
    } else {
      await API("post", `FeedBacks/AddFeedback`, {
        bookingId: selectedBooking.id,
        fromId: user.id,
        id: "",
        comment: comment,
        rating: selectedRatingValue,
        ratingFrom: user.role,
        toId: selectedUserData.id,
        lRateReason: updatefield ? updatefield : "",
        feedBackDate: new Date(),
      }).then(async (fedbackres) => {
        console.log("fedbackres", fedbackres.data.data);
        await API("post", `FeedBacks/SaveBookingReminder`, {
          BookingId: selectedBooking.id,
          ReminderComment: reminder,
        }).then((reminderres) => {
          console.log("reminderres", reminderres);
          toast.success(t("Rating submitted successfully"));
          setOpenRatingModal(false);
        });
      });
    }
  };
  return (
    <>
      <div className="Filters">
        <Grid container spacing={1} sx={{ marginTop: "30px" }}>
          <Grid xs={12} sm={12} md={3}>
            <Typography
              sx={{
                marginTop: "20px",
                paddingLeft: "80px",
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 400,
                fontSize: "24px",
                lineHight: "34px",
                color: "#2A3235",
              }}
            >
              {t("Pending request")}
            </Typography>
          </Grid>
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
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          isSelectedBook={isSelectedBook}
          setIsSelectedBook={setIsSelectedBook}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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
        <Box sx={style1}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" sx={{ fontWeight: "550" }}>
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
            placeholder={t("Minimum 3 rows")}
            name="comment"
            onChange={(e) => setComment(e.target.value)}
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
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={commentModal}
        onClose={handleCommentModalClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style2}>
          <MyLearningComponent commentsData={commentsData} />
        </Box>
      </Modal>
      <BasicModal open={profileModal} onClose={handleProfileModalClose} modalboxclassName="profile_modal">
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
            <p className="profile_text_right">{moment(profileData.dob).format("DD/MM/YYYY")}</p>
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
                <p className="icons_text1">{profileData.BookingLength}</p>
                <p className="icons_text2">{t("Bookings")}</p>
              </div>
            </div>
            <div className="profile_icons_div">
              <div className="icon_style_div">
                <img src={Rating} alt="" />
              </div>
              <div>
                <p className="icons_text1">{profileData.Rating != "NaN" ? profileData.Rating : "N/A"} </p>
                <p className="icons_text2">{t("Ratings")}</p>
              </div>
            </div>
          </div>
        </div>
      </BasicModal>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openRatingModal}
        onClose={() => setOpenRatingModal(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style3} className="responsiveModal">
          {/* <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontWeight: "550" }}
            ></FormLabel>
          </FormControl> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "4%",
            }}
          >
            <Typography sx={{ fontSize: "32px", fontWeight: "600", color: "#49544F" }}>{t("Give Feedback")}</Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={selectedUserData.photo} className="profile_img" style={{ marginBottom: "4%" }} />
          </div>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ fontSize: "28px", fontWeight: "600", color: "#49544F" }}>{selectedUserData.firstName}</Typography>
          </Grid>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: "500", color: "#49544F" }}>
              {t("Learn Car Driving with Permispop")}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "-13px",
            }}
          >
            <Ratings onChange={(e) => handleRatingValue(e)}></Ratings>
          </div>

          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder={t("Rating Reminder")}
            name="comment"
            style={{
              width: "100%",
              borderRadius: "5px",
              padding: "2%",
              border: "none",
              background: "#FAFAFA",
              marginTop: "10%",
            }}
            onChange={(e) => setReminder(e.target.value)}
          />

          {lowRating && (
            <div>
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
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder={t("Description")}
                name="comment"
                onChange={(e) => setComment(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  padding: "2%",
                  border: "none",
                  background: "#FAFAFA",
                }}
              />
            </div>
          )}
          <Grid container spacing={1} sx={{ marginTop: "8%" }}>
            <Grid sx={6} sm={6} md={6}>
              <Button
                text={t("Not Now")}
                width="95% !important"
                variant="outlined"
                color="#fff"
                textColor="black"
                borderRadius="10px"
                onClick={(e) => setOpenRatingModal(false)}
              ></Button>
            </Grid>
            <Grid sx={6} sm={6} md={6}>
              <Button
                text={t("Submit Rating")}
                width="95% !important"
                color="#149e7a"
                borderRadius="10px"
                onClick={(e) => handleRating(e)}
              ></Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Index;
