import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Events from "../../containers/Dashboard/Instructor/InsCalendar/Events";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import { ReactComponent as InstCalendar } from "../../assets/DrawerIcons/Icon-Calendar.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import { color } from "@mui/system";

const localizer = momentLocalizer(moment);
const eventsStyle = (event, start, end, isSelected) => {
  var bgcolor = "";
  if (event.status === "available") {
    if (event.type === "auto") {
      bgcolor = "#79CEF7";
    } else {
      bgcolor = "#FFB6C1";
    }
  } else if (event.status === "unavailable") {
    bgcolor = "#B0AEAE";
  } else if (event.status === "personal") {
    bgcolor = "#FFB6C1";
  } else {
    bgcolor = "#2CA888";
  }
  const style = {
    backgroundColor: bgcolor,
    border: "none",
  };
  return {
    style: style,
  };
};
const InsCalendar = () => {
  return (
    <div className="main-div">
      <div className="calendar-head">
        <div className="date-box">
          <IconButton>
            <ArrowBackIosNewIcon className="arrow-back" />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <InstCalendar className="calendar-icon" />

            <Typography className="current-date">Week 01</Typography>
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <ArrowForwardIosIcon className="arrow-forward" />
          </IconButton>
        </div>

        <div className="instructions-div">
          <div className="instructions">
            <div
              className="colorBox-div"
              style={{ backgroundColor: "#79CEF7" }}
            ></div>
            <Typography>Availability Auto</Typography>
          </div>
          <div className="instructions">
            <div
              className="colorBox-div"
              style={{ backgroundColor: "#FFB6C1" }}
            ></div>
            <Typography>Availablity Manual</Typography>
          </div>
          <div className="instructions">
            <div
              className="colorBox-div"
              style={{ backgroundColor: "#B0AEAE" }}
            ></div>
            <Typography>Unavailability</Typography>
          </div>
          <div className="instructions">
            <div
              className="colorBox-div"
              style={{ backgroundColor: "#9C6DD1" }}
            ></div>
            <Typography>Personal</Typography>
          </div>
          <div className="instructions">
            <div
              className="colorBox-div"
              style={{ backgroundColor: "#149E7A" }}
            ></div>
            <Typography>Booking</Typography>
          </div>
        </div>
        <Button className="add-button">
          <AddIcon className="add-icon" />
          <Typography className="btn-text">Add Availibity</Typography>
        </Button>
      </div>
      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={Events}
          eventPropGetter={eventsStyle}
          views={{ week: true, day: true }}
        />
      </div>
    </div>
  );
};

export default InsCalendar;
