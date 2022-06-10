// init
import React, { useEffect, useState } from "react";
import Button from "../../../components/Common/Button";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import API from "../../../api/index";
import DataTable from "../../../components/Common/Table";
import { FindInstructorcolumns } from "../../../utils/tableHeads";
import { useHistory } from "react-router-dom";
import Project from "../../../assets/images/form.svg";
import Rating from "../../../assets/images/path2006.svg";
import BasicModal from "../../../components/Common/BasicModal";
import moment from "moment";
import Image from "../../../assets/DumyImg/DumyImg.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import "../../css/Dashboard/Student/instructor.css";
import "../../../css/Dashboard/Student/instructor.css";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Common/FullScreenLoader";
import { ReactComponent as Chatsvg } from "../../../assets/images/ChatIcon.svg";
import { ReactComponent as Filter } from "../../../assets/images/filters.svg";
import Tooltip from "@mui/material/Tooltip";
import frLocale from "date-fns/locale/fr";
import enLocale from "date-fns/locale/en-US";

import { async } from "validate.js";
import { IconButton } from "@mui/material";
const localeMap = {
  en: enLocale,
  fr: frLocale,
};

const maskMap = {
  fr: "__/__/____",
  en: "__/__/____",
};
// component
const Index = () => {
  const { i18n, t } = useTranslation();
  const [lng, setLng] = React.useState();
  React.useEffect(() => {
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);
  const user = JSON.parse(localStorage.getItem("user"));

  const history = useHistory();
  const [profileData, setProfileData] = useState("");

  // states
  const [filters, setFilters] = useState({
    Gearbox: "All",
    Gender: "All",
    Radius: "30",
    Role: "All",
    startDate: null,
    endDate: null,
  });
  const [instructors, setInstructors] = useState([]);
  const [profileModal, setProfileModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSelected, setIsSelected] = useState("");

  useEffect(() => {
    getInstructors();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };
  const getInstructors = async () => {
    setLoading(true);
    await API(
      "get",
      `Profile/GetNearbyProfiles_New?lat=${user.lat}&log=${user.long}&radius=${filters.Radius}&gearbox=${
        filters.Gearbox
      }&gender=${filters.Gender}&role=${filters.Role}&startdate=${
        filters.startDate ? moment(filters.startDate).format("YYYY-MM-DD") : null
      }&enddate=${filters.endDate ? moment(filters.endDate).format("YYYY-MM-DD") : null}`
    )
      .then((FindInstructorsResponse) => {
        FindInstructorsResponse = FindInstructorsResponse?.data?.filter((item) => item?.profileInfo?.status !== "Deleted");
        let Profile = FindInstructorsResponse?.map((item) => {
          if (item.role === "CarRentalAgent" || item.role === "Instructor") {
            return API("get", `Bookings/GetBookingsByInstructor?id=${item.id}`).then((GetBookingsByInstructor) => {
              let newProfile = item;
              newProfile["BookingLength"] = GetBookingsByInstructor.data.data.length;
              return newProfile;
            });
          } else if (item.role === "DrivingSchool") {
            return API("get", `Bookings/GetBookingsByDrivingSchool?id=${item.id}`).then((GetBookingsByDrivingSchool) => {
              let newProfile = item;
              newProfile["BookingLength"] = GetBookingsByDrivingSchool.data.data.length;
              return newProfile;
            });
          }
        });
        Promise.all(Profile).then(async (e) => {
          let temp = e.filter(function (element) {
            return element !== undefined;
          });
          let newnewProfile = temp.map((pro) => {
            if (pro?.id) {
              return API("get", `FeedBacks/GetAverageRating?id=${pro.id}`).then((GetAverageRatingResponse) => {
                let newProfile = pro;
                newProfile["Rating"] = GetAverageRatingResponse.data.data;
                return newProfile;
              });
            }
          });
          Promise.all(newnewProfile).then((n) => {
            setInstructors(n);
            setLoading(false);
          });
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleReservation = (item) => {
    try {
      localStorage.setItem("selectedInstructor", JSON.stringify(item));
    } catch (e) {
      console.log(e);
    }
    window.location = "/student/InstructorBooking";
  };

  const handleChat = async (instructorData) => {
    await API("get", `Chat/getorcreatechatroom?userA=${user.id}&userB=${instructorData.id}`)
      .then((ChatroomResponse) => {
        localStorage.setItem("ChatroomId", JSON.stringify(ChatroomResponse.data.data.id));
        // history.push("/student/chat");
        window.location = "/student/chat";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProfileModalClose = () => {
    setIsSelected("");
    setProfileModal(false);
  };

  const handleProfile = (e) => {
    let selectedBooking = instructors.find((instructor) => {
      if (instructor.id === e.id) {
        return instructor;
      }
    });
    setProfileData(selectedBooking);
    setProfileModal(true);
  };
  const handleClose = () => setProfileModal(false);

  // jsx
  return (
    <div className="main-div_">
      <div className="instructor-dropdown-div">
        <div className="filter-container">
          <FormControl className="MobileView">
            <label style={{ fontWeight: 500 }}>{t("Gearbox")}</label>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="Gearbox"
              value={filters.Gearbox}
              onChange={(e) => handleFilterChange("Gearbox", e.target.value)}
              className="instructor-dropdown"
              sx={{ width: "70% !important" }}
            >
              <MenuItem value="All" name="All">
                {t("All")}
              </MenuItem>
              <MenuItem value="Auto" name="Auto">
                {t("Auto")}
              </MenuItem>
              <MenuItem value="Manual" name="Manual">
                {t("Manual")}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter-container">
          <FormControl className="MobileView">
            <label style={{ fontWeight: 500 }}>{t("Gender")}</label>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="Gender"
              value={filters.Gender}
              onChange={(e) => handleFilterChange("Gender", e.target.value)}
              className="instructor-dropdown"
              sx={{ width: "70% !important" }}
            >
              <MenuItem value="All" name="All">
                {t("All")}
              </MenuItem>
              <MenuItem value="Male" name={t("Male")}>
                {t("Male")}
              </MenuItem>
              <MenuItem value="Female" name={t("Female")}>
                {t("Female")}
              </MenuItem>
              <MenuItem value="Others" name={t("Others")}>
                {t("Others")}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter-container">
          <FormControl className="MobileView">
            <label style={{ fontWeight: 500 }}>{t("Interval /KM")}</label>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="Radius"
              value={filters.Radius}
              onChange={(e) => handleFilterChange("Radius", e.target.value)}
              className="instructor-dropdown"
              sx={{ width: "70% !important" }}
            >
              <MenuItem value="5" name="5">
                5
              </MenuItem>
              <MenuItem value="10" name="10">
                10
              </MenuItem>
              <MenuItem value="20" name="20">
                20
              </MenuItem>
              <MenuItem value="30" name="30">
                30
              </MenuItem>
              <MenuItem value="50" name="50">
                50
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter-container">
          <FormControl className="MobileView">
            <label style={{ fontWeight: 500 }}>{t("Role")}</label>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="Role"
              value={filters.Role}
              onChange={(e) => handleFilterChange("Role", e.target.value)}
              className="instructor-dropdown"
            >
              <MenuItem value="All" name="All">
                {t("All")}
              </MenuItem>
              <MenuItem value="DrivingSchool" name="Driving School">
                {t("Driving School")}
              </MenuItem>
              <MenuItem value="Instructor" name="Instructor">
                {t("Instructor")}
              </MenuItem>
              <MenuItem value="CarRentalAgent" name="Car Rental Agent">
                {t("Car Rental Agent")}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ marginLeft: "" }}>
          <FormControl className="MobileView">
            <label style={{ fontWeight: 500, marginBottom: -5 }}>{t("Start date")}</label>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[lng]}>
              <DatePicker
                mask={maskMap[lng]}
                value={filters.startDate ? moment(filters.startDate).format("YYYY-MM-DD") : ""}
                onChange={(newValue) => handleFilterChange("startDate", newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{
                      borderRadius: 10,
                      paddingRight: "30px",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        <div className="filter-container">
          <FormControl className="MobileView">
            <label style={{ fontWeight: 500, marginBottom: -5 }}>{t("End date")}</label>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[lng]}>
              <DatePicker
                mask={maskMap[lng]}
                value={filters.endDate ? moment(filters.endDate).format("YYYY-MM-DD") : ""}
                onChange={(newValue) => handleFilterChange("endDate", newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{
                      borderRadius: 10,
                      paddingRight: "30px",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        <Tooltip title="Filter">
          <IconButton className="FilterButton" onClick={getInstructors}>
            <Filter style={{ padding: "5%" }} />
          </IconButton>
        </Tooltip>
      </div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <DataTable
          data={instructors}
          columns={FindInstructorcolumns}
          user={user}
          handleReservation={handleReservation}
          handleChat={handleChat}
          handleProfile={handleProfile}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
      )}
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
                <p className="icons_text2">Bookings</p>
              </div>
            </div>
            <div className="profile_icons_div">
              <div className="icon_style_div">
                <img src={Rating} alt="" />
              </div>
              <div>
                <p className="icons_text1">{profileData.Rating != "NaN" ? profileData.Rating : "N/A"}</p>
                <p className="icons_text2">Ratings</p>
              </div>
            </div>
            <div className="profile_icons_div" onClick={handleChat}>
              <div className="icon_style_div">
                <Chatsvg className="modal_chat_icon" />
              </div>
              <div>
                <p className="icons_text2" style={{ cursor: "pointer" }}>
                  Chat
                </p>
              </div>
            </div>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default Index;
