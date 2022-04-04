import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Button from "../../../../components/Common/Button";
import L from "leaflet";
import { useHistory } from "react-router-dom";
import Project from "../../../../assets/images/form.svg";
import Rating from "../../../../assets/images/path2006.svg";
import Image from "../../../../assets/DumyImg/DumyImg.png";
import API from "../../../../api/index";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

const Maps = (props) => {
  const studentData = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const [ProfileModal, setProfileModal] = useState(false);
  const [data, setData] = useState({});
  const [instructorType, setInstructorType] = useState({
    Gearbox: "All",
    Gender: "All",
    Role: "All",
    Apply: false,
  });

  useEffect(() => {
    ProfilesOnMap(studentData);
  }, []);

  const ProfilesOnMap = async (studentData) => {
    await API(
      "get",
      `Profile/GetNearbyProfilesForMap?lat=${studentData.lat}&log=${studentData.long}&gearbox=${instructorType.Gearbox}&gender=${instructorType.Gender}&role=${instructorType.Role}`
    )
      .then((GetNearbyProfilesForMapResponce) => {
        setData(GetNearbyProfilesForMapResponce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (name, value) => {
    setInstructorType({ ...instructorType, [name]: value });
  };

  const handleChatClick = () => history.push("/student/chat");
  const handleBooking = () => history.push("/student/booking");
  const url = "https://www.nbrc.com.au/images/avatar-placeholder.png";
  const profileImg = studentData.role === "Student" ? studentData.photo : url;

  var greyIcon = new L.Icon({
    iconUrl: url,
    iconSize: [60, 65],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="main-div">
      <div className="dropdown-div">
        <div style={{ marginLeft: "2%" }}>
          <FormControl className="MobileView">
            <label style={{ fontWeight: 500 }}>Gearbox</label>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="Gearbox"
              value={instructorType.Gearbox}
              onChange={(e) => handleChange("Gearbox", e.target.value)}
              className="dropdown"
            >
              <MenuItem value="All" name="All">
                All
              </MenuItem>
              <MenuItem value="Auto" name="Auto">
                Auto
              </MenuItem>
              <MenuItem value="Manual" name="Manual">
                Manual
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <FormControl className="MobileView">
            <label style={{ fontWeight: 500 }}>Gender</label>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="Gender"
              value={instructorType.Gender}
              onChange={(e) => handleChange("Gender", e.target.value)}
              className="dropdown"
            >
              <MenuItem value="All" name="All">
                All
              </MenuItem>
              <MenuItem value="Male" name="Male">
                Male
              </MenuItem>
              <MenuItem value="Female" name="Female">
                Female
              </MenuItem>
              <MenuItem value="Others" name="Others">
                Others
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <FormControl className="MobileView">
            <label style={{ fontWeight: 500 }}>Role</label>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="Role"
              value={instructorType.Role}
              onChange={(e) => handleChange("Role", e.target.value)}
              className="dropdown"
            >
              <MenuItem value="All" name="All">
                All
              </MenuItem>
              <MenuItem value="Driving School" name="Driving School">
                Driving School
              </MenuItem>
              <MenuItem value="Instructor" name="Instructor">
                Instructor
              </MenuItem>
              <MenuItem value="Car Rental Agent" name="Car Rental Agent">
                Car Rental Agent
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button
          className="ProfileButton"
          text="Apply"
          borderRadius="5px"
          height="60px"
          width="12% !important"
          color="#149e7a  !important"
          margin="0 0 2px 5% !important"
          sx={{ padding: "0 !important" }}
          onClick={ProfilesOnMap}
        ></Button>
      </div>
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
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerClusterGroup showCoverageOnHover={true}>
          <Marker
            position={[studentData.lat, studentData.long]}
            icon={greyIcon}
          >
            <Popup>
              <p className="pop_text">Your Position</p>
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
                              popupAnchor: [1, -34],
                              className: "leaflet-div-icon",
                            })
                        : item?.role === "CarRentalAgent"
                        ? item.photo === null || item.photo === ""
                          ? greyIcon
                          : new L.Icon({
                              iconUrl: item.photo,
                              iconSize: [60, 65],
                              iconAnchor: [12, 41],
                              popupAnchor: [1, -34],
                              className: "leaflet-div-icon",
                            })
                        : item?.role === "DrivingSchool"
                        ? item.photo === null || item.photo === ""
                          ? greyIcon
                          : new L.Icon({
                              iconUrl: item.photo,
                              iconSize: [60, 65],
                              iconAnchor: [12, 41],
                              popupAnchor: [1, -34],
                              className: "leaflet-div-icon",
                            })
                        : item?.role === "DrivingSchoolInstructor"
                        ? item.photo === null || item.photo === ""
                          ? greyIcon
                          : new L.Icon({
                              iconUrl: item.photo,
                              iconSize: [60, 65],
                              iconAnchor: [12, 41],
                              popupAnchor: [1, -34],
                              className: "leaflet-div-icon",
                            })
                        : ""
                    }
                  >
                    <Popup>
                      <div className="pop_up_div">
                        <div className="profile_img_div">
                          <img
                            src={item.photo !== null ? item.photo : Image}
                            alt=""
                            className="profile_img"
                          />
                        </div>
                        <p className="bold_text">
                          {item.firstName} {item.surName}
                        </p>
                        <p className="role_text"> {item.role}</p>
                        <p className="role_text">
                          <LocationOnIcon style={{ marginRight: 5 }} />{" "}
                          {item.address}
                          {item.city} {item.zip}
                        </p>
                        <div className="icons">
                          <div className="icons_div">
                            <div className="icon_style_div">
                              <img src={Project} alt="" />
                            </div>
                            <div>
                              <p className="icons_text1">334</p>
                              <p className="icons_text2">Projects</p>
                            </div>
                          </div>
                          <div className="icons_div">
                            <div className="icon_style_div">
                              <img src={Rating} alt="" />
                            </div>
                            <div>
                              <p className="icons_text1">4.4</p>
                              <p className="icons_text2">Ratings</p>
                            </div>
                          </div>
                        </div>
                        <div className="popup_button_div">
                          <Button
                            text="Book Now"
                            borderRadius="5px"
                            width="60% !important"
                            textColor="#f4f4f4 !important"
                            className="popup_btn"
                            onClick={handleBooking}
                          />
                          <Button
                            text="Chat"
                            borderRadius="5px"
                            width="60% !important"
                            margin="0 0 0 5px !important"
                            textColor="#f4f4f4 !important"
                            color="#149e7a  !important"
                            className="popup_btn"
                            onClick={handleChatClick}
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

export default Maps;

const greyIcon = (photo) =>
  new L.Icon({
    iconUrl: "https://www.nbrc.com.au/images/avatar-placeholder.png",
    iconSize: [60, 65],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
export { greyIcon };