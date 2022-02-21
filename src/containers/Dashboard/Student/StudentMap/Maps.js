import React, { useState } from "react";
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

const Maps = (props) => {
  const [ProfileModal, setProfileModal] = useState(false);
  const handleProfileModal = () => {
    setProfileModal(true);
  };
  const handleProfileModalClose = () => {
    setProfileModal(false);
  };
  const history = useHistory();
  const handleChatClick = () => history.push("/student/chat");
  const handleBooking = () => history.push("/student/booking");

  const User = [
    {
      UserName: "Haza",
      role: "Driving School",
      age: "24",
      VehicleType: "Manual",
      position: "46.735888607092335, 3.1871579070975016",
    },
    {
      UserName: "Lucid",
      role: "Driving School Instructor",
      age: "24",
      VehicleType: "Auto",
      position: "46.73351349048445, 3.1831560514361077",
    },
    {
      UserName: "Mr.X",
      role: "Instructor",
      age: "24",
      VehicleType: "Unavailable",
      position: "46.73351349048445, 3.1831560514361077",
    },
    {
      UserName: "Mannan",
      role: "Car rental",
      age: "24",
      VehicleType: "Personal",
      position: "46.73351349048445, 3.1831560514361077",
    },
    {
      UserName: "User",
      role: "Student",
      age: "24",
      VehicleType: "Booking",
      position: "46.73351349048445, 3.1831560514361077",
    },
  ];
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
      <div className="button-div">
        <Button
          text="Gearbox"
          variant="outlined"
          width="130px !important"
          textColor="#363557 !important"
          margin="10px !important"
          borderColor=" #C7C7C7 !important"
        />
        <Button
          text="Gender"
          variant="outlined"
          width="130px !important"
          textColor="#363557 !important"
          margin="10px !important"
          borderColor=" #C7C7C7 !important"
        />
        <Button
          text="Role"
          variant="outlined"
          width="130px !important"
          textColor="#363557 !important"
          margin="10px !important"
          borderColor=" #C7C7C7 !important"
        />
        <Button
          text="Apply"
          variant="outlined"
          width="130px !important"
          textColor="#FFFFFF !important"
          color="#149E7A !important"
          margin="10px !important"
        />
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
                <img src={Project} />
              </div>
              <div>
                <p className="icons_text1">334</p>
                <p className="icons_text2">Projects</p>
              </div>
            </div>
            <div className="icons_div">
              <div className="icon_style_div">
                <img src={Rating} />
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
