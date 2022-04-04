import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Button from "../../../../components/Common/Button";
import L from "leaflet";
import BasicModal from "../../../../components/Common/BasicModal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useHistory } from "react-router-dom";
import Project from "../../../../assets/images/form.svg";
import Rating from "../../../../assets/images/path2006.svg";
import Image from "../../../../assets/DumyImg/DumyImg.png";
import API from "../../../../api/index";
import DropDown from "../../../../components/Common/DropDown";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

const Maps = (props) => {
  const history = useHistory();
  const [ProfileModal, setProfileModal] = useState(false);
  const [instructorType, setInstructorType] = useState({
    Gearbox: "All",
    Gender: "All",
    Role: "All",
    Apply: false,
  });
  console.log(
    "🚀 ~ file: Maps.js ~ line 24 ~ Maps ~ instructorType",
    instructorType
  );

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    ProfilesOnMap(userData);
  }, []);

  const ProfilesOnMap = async (userData) => {
    await API(
      "get",
      `Profile/GetNearbyProfilesForMap?lat=${userData.lat}&log=${userData.long}&gearbox=${instructorType.Gearbox}&gender=${instructorType.Gender}&role=${instructorType.Role}`
    ).then((res) => {
      console.log("API --------->", res);
    });
  };
  const handleChange = (name, value) => {
    setInstructorType({ ...instructorType, [name]: value });
  };

  const handleProfileModal = () => {
    setProfileModal(true);
  };
  const handleProfileModalClose = () => {
    setProfileModal(false);
  };
  const handleChatClick = () => history.push("/student/chat");
  const handleBooking = () => history.push("/student/booking");

  var greenIcon = new L.Icon({
    iconUrl: "https://www.nbrc.com.au/images/avatar-placeholder.png",
    iconSize: [60, 65],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  var redIcon = new L.Icon({
    iconUrl: "https://www.nbrc.com.au/images/avatar-placeholder.png",
    iconSize: [60, 65],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  var blackIcon = new L.Icon({
    iconUrl: "https://www.nbrc.com.au/images/avatar-placeholder.png",

    iconSize: [60, 65],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  var yellowIcon = new L.Icon({
    iconUrl: "https://www.nbrc.com.au/images/avatar-placeholder.png",
    iconSize: [60, 65],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  var greyIcon = new L.Icon({
    iconUrl: "https://www.nbrc.com.au/images/avatar-placeholder.png",
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
        center={[46.73574154405467, 3.1627068900508446]}
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
          {/* {User.map((items) => {
            <Marker
              position={[items.position]}
              // icon={greenIcon}
            />;
          })} */}
          <Marker
            position={[46.735888607092335, 3.1871579070975016]}
            icon={greenIcon}
          >
            <Popup>
              <p className="pop_text">Your Position</p>
            </Popup>
          </Marker>
          <Marker
            position={[46.73351349048445, 3.1831560514361077]}
            icon={greyIcon}
          >
            <Popup>
              <p className="pop_text">Instructor</p>
              <Button
                text="Book Now"
                variant="outlined"
                width="120px !important"
                textColor="#FFFFFF !important"
                color="#149E7A !important"
                margin="10px !important"
                onClick={handleBooking}
              />
              <IconButton>
                <RemoveRedEyeIcon
                  onClick={handleProfileModal}
                  className="icons"
                />
              </IconButton>
              <IconButton>
                <ChatIcon onClick={handleChatClick} className="icons" />
              </IconButton>
            </Popup>
          </Marker>
          <Marker
            position={[46.73541065085842, 3.1757209680205016]}
            icon={yellowIcon}
          >
            <Popup>
              <p className="pop_text">Driving School</p>
              <Button
                text="Book Now"
                variant="outlined"
                width="120px !important"
                textColor="#FFFFFF !important"
                color="#149E7A !important"
                margin="10px !important"
                onClick={handleBooking}
              />
              <IconButton>
                <RemoveRedEyeIcon
                  onClick={handleProfileModal}
                  className="icons"
                />
              </IconButton>
              <IconButton>
                <ChatIcon onClick={handleChatClick} className="icons" />
              </IconButton>
            </Popup>
          </Marker>
          <Marker
            position={[46.73574154405467, 3.1627068900508446]}
            icon={blackIcon}
          >
            <Popup>
              <p className="pop_text">Instructor</p>
              <Button
                text="Book Now"
                variant="outlined"
                width="120px !important"
                textColor="#FFFFFF !important"
                color="#149E7A !important"
                margin="10px !important"
                onClick={handleBooking}
              />
              <IconButton>
                <RemoveRedEyeIcon
                  onClick={handleProfileModal}
                  className="icons"
                />
              </IconButton>
              <IconButton>
                <ChatIcon onClick={handleChatClick} className="icons" />
              </IconButton>
            </Popup>
          </Marker>
          <Marker
            position={[46.729557181582194, 3.1536946677339754]}
            icon={redIcon}
          >
            <Popup>
              <p className="pop_text">Car Rental Agent</p>
              <Button
                text="Book Now"
                variant="outlined"
                width="120px !important"
                textColor="#FFFFFF !important"
                color="#149E7A !important"
                margin="10px !important"
                onClick={handleBooking}
              />
              <IconButton>
                <RemoveRedEyeIcon
                  onClick={handleProfileModal}
                  className="icons"
                />
              </IconButton>
              <IconButton>
                <ChatIcon onClick={handleChatClick} className="icons" />
              </IconButton>
            </Popup>
          </Marker>
          <Marker
            position={[46.72203337042487, 3.14315804349606]}
            icon={redIcon}
          >
            <Popup>
              <p className="pop_text">Driving School Instructure</p>
              <Button
                text="Book Now"
                variant="outlined"
                width="120px !important"
                textColor="#FFFFFF !important"
                color="#149E7A !important"
                margin="10px !important"
                onClick={handleBooking}
              />
              <IconButton>
                <RemoveRedEyeIcon
                  onClick={handleProfileModal}
                  className="icons"
                />
              </IconButton>
              <IconButton>
                <ChatIcon onClick={handleChatClick} className="icons" />
              </IconButton>
            </Popup>
          </Marker>
          <Marker
            position={[46.69676756440226, 3.0275876224016773]}
            icon={blackIcon}
          >
            <Popup>
              <p className="pop_text">Driving School</p>
              <Button
                text="Book Now"
                variant="outlined"
                width="120px !important"
                textColor="#FFFFFF !important"
                color="#149E7A !important"
                margin="10px !important"
                onClick={handleBooking}
              />
              <IconButton>
                <RemoveRedEyeIcon
                  onClick={handleProfileModal}
                  className="icons"
                />
              </IconButton>
              <IconButton>
                <ChatIcon onClick={handleChatClick} className="icons" />
              </IconButton>
            </Popup>
          </Marker>
        </MarkerClusterGroup>
      </MapContainer>
      <BasicModal
        open={ProfileModal}
        onClose={handleProfileModalClose}
        modalboxclassName="detail_modal"
      >
        <div>
          <div className="profile_img_div">
            <img src={Image} alt="" className="profile_img" />
          </div>
          <p className="bold_text">James Anderson</p>
          <p>Instructor</p>
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
          <Button
            text="Book Now"
            width="70% !important"
            textColor="#f4f4f4 !important"
            margin="10px"
            borderRadius="20px !important"
          />
        </div>
      </BasicModal>
    </div>
  );
};

export default Maps;
