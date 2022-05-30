import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import { ReactComponent as InstCalendar } from "../../assets/DrawerIcons/Icon-Calendar.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import "moment/locale/fr";
import "moment/locale/en-gb";
import i18n from "../../utils/i18n";

moment.locale("fr");
moment.locale("es-es", {
  week: {
    dow: 1, //Monday is the first day of the week.
  },
});

const localizer = momentLocalizer(moment);

let formats = {
  dateFormat: "DD",
  monthHeaderFormat: "DD/MM/YYYY",
  dayHeaderFormat: "DD/MM/YYYY",
  dayRangeHeaderFormat: "DD/MM/YYYY",
  timeGutterFormat: (date, culture, localizer) => localizer.format(date, "HH:mm", culture),
  eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, "HH:mm") + "-" + localizer.format(end, "HH:mm"),
};
//change calender texts to french

const messagesFrench = {
  allDay: "journée",
  previous: "précédent",
  next: "suivant",
  today: "aujourd'hui",
  month: "mois",
  week: "semaine",
  day: "jour",
  agenda: "Agenda",
  date: "date",
  time: "heure",
  event: "événement", // Or anything you want
  showMore: (total) => `+ ${total} événement(s) supplémentaire(s)`,
};

const messagesEnglish = {
  allDay: "All Day",
  previous: "Previous",
  next: "Next",
  today: "Today",
  month: "Month",
  week: "Week",
  day: "Day",
  agenda: "Agenda",
  date: "Date",
  time: "Time",
  event: "Event", // Or anything you want
  showMore: (total) => `+ ${total} événement(s) supplémentaire(s)`,
};

const eventsStyle = (event) => {
  var bgcolor = "";
  var fontSize = "";
  // condition for setting color in divs in calendar head
  if (event.status === "available" || event.status === "Available") {
    fontSize = "14px";
    if (event.type === "auto" || event.type === "Auto") {
      bgcolor = "#79CEF7";
    } else if (event.type === "manual" || event.type === "Manual") {
      bgcolor = "#FFB6C1";
      fontSize = "14px";
    } else {
    }
  } else if (event.status === "unavailable" || event.status === "Unavailable") {
    bgcolor = "#B0AEAE";
    fontSize = "14px";
  } else if (event.status === "personal" || event.status === "Personal") {
    bgcolor = "#9C6DD1";
    fontSize = "14px";
  } else {
    bgcolor = "#2CA888";
    fontSize = "14px";
  }
  const style = {
    backgroundColor: bgcolor,
    fontSize: fontSize,
    border: "none",
  };
  return {
    style: style,
  };
};
const CalendarComponent = (props) => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState();
  useEffect(() => {
    setLanguage(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);
  return (
    <div className="main-div">
      <div className="calendar-head">
        {/* <div className="date-box">
          <IconButton>
            <ArrowBackIosNewIcon className="arrow-back" />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <InstCalendar className="calendar-icon" />

            <Typography className="current-date">{t("Week")} 01</Typography>
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <ArrowForwardIosIcon className="arrow-forward" />
          </IconButton>
        </div> */}

        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div className="instructions-div">
            <div className="instructions">
              <div className="colorBox-div" style={{ backgroundColor: "#79CEF7" }}></div>
              {/* styling of calendar toolbar text */}
              <Typography className="instruction-text">{t("Availability Auto")}</Typography>
            </div>
            <div className="instructions">
              <div className="colorBox-div" style={{ backgroundColor: "#FFB6C1" }}></div>
              <Typography className="instruction-text">{t("Availablity Manual")}</Typography>
            </div>
            <div className="instructions">
              <div className="colorBox-div" style={{ backgroundColor: "#B0AEAE" }}></div>
              <Typography className="instruction-text">{t("Unavailability")}</Typography>
            </div>
            <div className="instructions">
              <div className="colorBox-div" style={{ backgroundColor: "#9C6DD1" }}></div>
              <Typography className="instruction-text">{t("Personal")}</Typography>
            </div>
            <div className="instructions">
              <div className="colorBox-div" style={{ backgroundColor: "#149E7A" }}></div>
              <Typography className="instruction-text">{t("Booking")}</Typography>
            </div>
          </div>
        </div>
        {props.role ? (
          props.role === "DrivingSchool" ? (
            <Button className="add-button" onClick={props.onAddClick}>
              <AddIcon className="add-icon" />
              <Typography className="btn-text">{t("Add Availibity")}</Typography>
            </Button>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={props.events}
          eventPropGetter={eventsStyle}
          views={props.views || { week: true, day: true }}
          defaultView={Views.WEEK}
          onSelectEvent={props.onSelectEvent}
          onSelectSlot={props.onSelectSlot}
          selectable={true}
          min={props.min}
          max={props.max}
          onNavigate={props.onNavigate}
          culture={language}
          formats={formats}
          messages={language === "fr" ? messagesFrench : language === "en" ? messagesEnglish : ""}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
