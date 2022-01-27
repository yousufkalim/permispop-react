import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Button from "../../../../components/Common/Button";
import L from "leaflet";

const Maps = () => {
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
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  var redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  var blackIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  var yellowIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  var greyIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
    iconSize: [25, 41],
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
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerClusterGroup>
          {/* {User.map((items) => {
            <Marker
              position={[items.position]}
              // icon={greenIcon}
            />;
          })} */}
          <Marker
            position={[46.735888607092335, 3.1871579070975016]}
            icon={greenIcon}
          />

          <Marker
            position={[46.73351349048445, 3.1831560514361077]}
            icon={greyIcon}
          />
          <Marker
            position={[46.73541065085842, 3.1757209680205016]}
            icon={yellowIcon}
          />
          <Marker
            position={[46.73574154405467, 3.1627068900508446]}
            icon={blackIcon}
          />
          <Marker
            position={[46.729557181582194, 3.1536946677339754]}
            icon={redIcon}
          />
          <Marker
            position={[46.72203337042487, 3.14315804349606]}
            icon={redIcon}
          />
          <Marker
            position={[46.69676756440226, 3.0275876224016773]}
            icon={blackIcon}
          />
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Maps;
