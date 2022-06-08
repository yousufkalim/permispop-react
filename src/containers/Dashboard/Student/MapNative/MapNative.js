import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Button1 from "@mui/material/Button";
import Button from "../../../../components/Common/Button";
import L from "leaflet";
import { useHistory } from "react-router-dom";
import Project from "../../../../assets/images/form.svg";
import Rating from "../../../../assets/images/path2006.svg";
import Image from "../../../../assets/DumyImg/DumyImg.png";
import API from "../../../../api/index";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const MapNative = (props) => {
  const { i18n, t } = useTranslation();
  const studentData = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const [data, setData] = useState([]);
  const [instructorType, setInstructorType] = useState({
    Gearbox: "All",
    Gender: "All",
    Role: "All",
    Apply: false,
  });
  const [isGearBox, setIsGearBox] = useState(true);
  const [isGender, setIsGender] = useState(true);
  const [isRole, setIsRole] = useState(true);

  useEffect(() => {
    ProfilesOnMap(studentData);
  }, []);

  const ProfilesOnMap = async (studentData) => {
    await API(
      "get",
      `Profile/GetNearbyProfilesForMap?lat=${studentData.lat}&log=${studentData.long}&gearbox=${instructorType.Gearbox}&gender=${instructorType.Gender}&role=${instructorType.Role}`
    )
      .then((GetNearbyProfilesForMapResponse) => {
        let Profile = GetNearbyProfilesForMapResponse.data.map((item) => {
          if (item.role === "CarRentalAgent" || item.role === "Instructor") {
            return API(
              "get",
              `Bookings/GetBookingsByInstructor?id=${item.id}`
            ).then((GetBookingsByInstructor) => {
              let newProfile = item;
              newProfile["BookingLength"] =
                GetBookingsByInstructor.data.data.length;
              return newProfile;
            });
          } else if (item.role === "DrivingSchool") {
            return API(
              "get",
              `Bookings/GetBookingsByDrivingSchool?id=${item.id}`
            ).then((GetBookingsByDrivingSchool) => {
              let newProfile = item;
              newProfile["BookingLength"] =
                GetBookingsByDrivingSchool.data.data.length;
              return newProfile;
            });
          }
        });

        Promise.all(Profile).then(async (e) => {
          let newnewProfile = e.map((pro) => {
            return API("get", `FeedBacks/GetAverageRating?id=${pro.id}`).then(
              (GetAverageRatingResponse) => {
                let newProfile = pro;

                newProfile["Rating"] = GetAverageRatingResponse.data.data;
                return newProfile;
              }
            );
          });
          Promise.all(newnewProfile).then((n) => {
            setData(n);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (name, value) => {
    name === "Gearbox"
      ? setIsGearBox(false)
      : name === "Gearbox"
      ? setIsGender(false)
      : setIsRole(false);
    setInstructorType({ ...instructorType, [name]: value });
  };

  const url = "https://www.nbrc.com.au/images/avatar-placeholder.png";
  const profileImg =
    studentData.photo !== null || undefined ? studentData.photo : url;

  var greyIcon = new L.Icon({
    iconUrl: profileImg,
    iconSize: [60, 65],
    iconAnchor: [12, 41],
    popupAnchor: [16, -38],
    className: "leaflet-div-icon",
  });

  return (
    <div className="main-div_">
      <Grid container spacing={1} style={{ margin: "10px 0 10px 25px" }}>
        <Grid xs={5} sm={5} style={{ margin: "3px" }}>
          <Select
            name="Gearbox"
            value={
              instructorType.Gearbox === "All"
                ? isGearBox
                  ? "GearBox"
                  : instructorType.Gearbox
                : instructorType.Gearbox
            }
            onChange={(e) => handleChange("Gearbox", e.target.value)}
            className="dropdown1"
          >
            <MenuItem value="GearBox" disabled>
              {t("GearBox")}
            </MenuItem>

            <MenuItem value="All">{t("All")}</MenuItem>
            <MenuItem value="Auto">{t("Auto")}</MenuItem>
            <MenuItem value="Manual">{t("Manual")}</MenuItem>
          </Select>
        </Grid>

        <Grid xs={5} sm={5} style={{ margin: "3px" }}>
          <Select
            name="Gender"
            value={
              instructorType.Gender === "All"
                ? isGender
                  ? "Gender"
                  : instructorType.Gender
                : instructorType.Gender
            }
            onChange={(e) => handleChange("Gender", e.target.value)}
            className="dropdown1"
          >
            <MenuItem value="Gender" disabled>
              {t("Gender")}
            </MenuItem>
            <MenuItem value="All">{t("All")}</MenuItem>
            <MenuItem value="Male">{t("Male")}</MenuItem>
            <MenuItem value="Female">{t("Female")}</MenuItem>
            <MenuItem value="Others">{t("Others")}</MenuItem>
          </Select>
        </Grid>
        <Grid xs={5} sm={5} style={{ margin: "3px" }}>
          <Select
            name="Role"
            value={
              instructorType.Role === "All"
                ? isRole
                  ? "Role"
                  : instructorType.Role
                : instructorType.Role
            }
            onChange={(e) => handleChange("Role", e.target.value)}
            className="dropdown1"
          >
            <MenuItem value="Role" disabled>
              {t("Role")}
            </MenuItem>
            <MenuItem value="All">{t("All")}</MenuItem>
            <MenuItem value="DrivingSchool">{t("Driving School")}</MenuItem>
            <MenuItem value="Instructor">{t("Instructor")}</MenuItem>
            <MenuItem value="CarRentalAgent">{t("Car Rental Agent")}</MenuItem>
          </Select>
        </Grid>
        <Grid xs={5} sm={5} style={{ margin: "3px" }}>
          <div className="btn_filter">
            <Button1
              className="filter_btn"
              onClick={ProfilesOnMap}
              variant="contained"
              fullWidth
            >
              {t("Apply")}
            </Button1>
          </div>
        </Grid>
      </Grid>
      <MapContainer
        className="markercluster-map"
        center={[studentData.lat, studentData.long]}
        zoom={14}
        maxZoom={19}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.5}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=b51367d1-7f98-4edc-ad6e-4ec7471e0ee8"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup showCoverageOnHover={true}>
          <Marker
            position={[studentData.lat, studentData.long]}
            icon={greyIcon}
          >
            <Popup>
              <p className="pop_text">{t("Your Position")}</p>
            </Popup>
          </Marker>
          {Object.keys(data).length > 0 &&
            data.map((item) => {
              return (
                <>
                  <Marker
                    position={[item?.lat, item?.long]}
                    icon={
                      item?.role === "Instructor"
                        ? item.photo === null || item.photo === ""
                          ? greyIcon
                          : new L.Icon({
                              iconUrl: item.photo,
                              iconSize: [60, 65],
                              iconAnchor: [12, 41],
                              popupAnchor: [16, -38],
                              className: "leaflet-div-icon",
                            })
                        : item?.role === "CarRentalAgent"
                        ? item.photo === null || item.photo === ""
                          ? greyIcon
                          : new L.Icon({
                              iconUrl: item.photo,
                              iconSize: [60, 65],
                              iconAnchor: [12, 41],
                              popupAnchor: [16, -38],
                              className: "leaflet-div-icon",
                            })
                        : item?.role === "DrivingSchool"
                        ? item.photo === null || item.photo === ""
                          ? greyIcon
                          : new L.Icon({
                              iconUrl: item.photo,
                              iconSize: [60, 65],
                              iconAnchor: [12, 41],
                              popupAnchor: [16, -38],
                              className: "leaflet-div-icon",
                            })
                        : item?.role === "DrivingSchoolInstructor"
                        ? item.photo === null || item.photo === ""
                          ? greyIcon
                          : new L.Icon({
                              iconUrl: item.photo,
                              iconSize: [60, 65],
                              iconAnchor: [12, 41],
                              popupAnchor: [16, -38],
                              className: "leaflet-div-icon",
                            })
                        : ""
                    }
                  >
                    <Popup>
                      <div>
                        <div className="profile_img_div">
                          <img
                            src={item?.photo ? item?.photo : item.photo === "null" || "undefined" ? Image : item.photo}
                            alt=""
                            className="profile_img"
                          />
                        </div>
                        <p className="bold_text">
                          {item.firstName} {item.surName}
                        </p>
                        <p className="role_text"> {item.role}</p>
                        <p className="role_text">
                          <LocationOnIcon style={{ marginRight: 5 }} /> {item.address}
                          {item.city} {item.zip}
                        </p>
                        <div className="icons">
                          <div className="icons_div">
                            <div className="icon_style_div">
                              <img src={Project} alt="" />
                            </div>
                            <div className="popup_text">
                              <p className="icons_text1">{item.BookingLength}</p>
                              <p className="icons_text2">{t("Bookings")}</p>
                            </div>
                          </div>
                          <div className="icons_div">
                            <div className="icon_style_div">
                              <img src={Rating} alt="" />
                            </div>
                            <div>
                              <p className="icons_text1">{item.Rating != "NaN" ? item.Rating : "N/A"}</p>
                              <p className="icons_text2">{t("Ratings")}</p>
                            </div>
                          </div>
                        </div>
                        <div className="popup_button_div">
                          <Button
                            text="Book Now"
                            borderRadius="5px"
                            width="50% !important"
                            textColor="#f4f4f4 !important"
                            className="popup_btn"
                            onClick={() => (window.location = `/isBooking/userId=${item.id}`)}
                          />
                          <Button
                            text="Chat"
                            borderRadius="5px"
                            width="50% !important"
                            margin="030 0 5px !important"
                            textColor="#f4f4f4 !important"
                            color="#149e7a  !important"
                            className="popup_btn"
                            onClick={() => (window.location = `/isChat/userId=${item.id}`)}
                          />
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                </>
              );
            })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapNative;
