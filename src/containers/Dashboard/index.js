// init
import React, { useEffect, useState } from "react";
import Button from "../../components/Common/Button";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import API from "../../api/index";
import DataTable from "../../components/Common/Table";
import { FindInstructorcolumns } from "../../utils/tableHeads";
import { useHistory } from "react-router-dom";
import "../../css/Dashboard/Student/instructor.css";
import { useTranslation } from "react-i18next";

// component
const Index = () => {
  const { i18n , t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
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

  useEffect(() => {
    getInstructors();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const getInstructors = async () => {
    console.log(filters.Gearbox, "filters.Gearbox");
    let res = await API(
      "get",
      `Profile/GetNearbyProfiles_New/?lat=${user.lat}&log=${user.long}&radius=${filters.Radius}&gearbox=${filters.Gearbox}&gender=${filters.Gender}&role=${filters.Role}&startdate=${filters.startDate}&enddate=${filters.endDate}`
    );
    setInstructors(res.data);
  };

  const handleReservation = () => {
    history.push("/student/booking");
  };

  const handleCat = () => {
    history.push("/student/chat");
  };

  const handleProfile = () => {
    history.push("/student/myProfille");
  };

  // jsx
  return (
    <div className="main-div">
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
            >
              <MenuItem value="All" name="All">
                {t("All")}
              </MenuItem>
              <MenuItem value="Male" name="Male">
                {t("Male")}
              </MenuItem>
              <MenuItem value="Female" name="Female">
                {t("Female")}
              </MenuItem>
              <MenuItem value="Others" name="Others">
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
        <div style={{ marginLeft: "2%" }}>
          <FormControl className="MobileView">
            <label style={{ fontWeight: 500, marginBottom: -5 }}>
              {t("Start date")}
            </label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={filters.startDate}
                onChange={(newValue) =>
                  handleFilterChange("startDate", newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{
                      borderRadius: 10,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        <div className="filter-container">
          <FormControl className="MobileView">
            <label style={{ fontWeight: 500, marginBottom: -5 }}>
              {t("End date")}
            </label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={filters.endDate}
                onChange={(newValue) => handleFilterChange("endDate", newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{
                      borderRadius: 10,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </div>

        <Button
          text={t("Apply")}
          borderRadius="5px"
          height="60px"
          height2="60px"
          height3="60px"
          height4="60px"
          width="150px !important"
          color="#149e7a  !important"
          margin="0 0 2px 5% !important"
          onClick={getInstructors}
        />
      </div>
      <DataTable
        data={instructors}
        columns={FindInstructorcolumns}
        user={user}
        handleReservation={handleReservation}
        handleCat={handleCat}
        handleProfile={handleProfile}
      />
    </div>
  );
};

export default Index;
