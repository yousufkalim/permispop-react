import React from "react";
import CalendarComponent from "../../../../components/Common/Calendar";
import Events from "./Events";
import BasicModal from "../../../../components/Common/BasicModal";
import Divider from "../../../../components/Common/Divider";
import TextField from "../../../../components/Common/TextField";
import Button from "../../../../components/Common/Button";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Calendar = () => {
  const { i18n , t } = useTranslation();
  //   const [open, setOpen] = React.useState(false);

  //   const [eventDeleteModal, setEventDeleteModal] = React.useState(false);
  const [bookingModal, setBookingModal] = React.useState(false);
  const [AddBookingModal, setAddBookingModal] = React.useState(false);

  //   const [value, setValue] = React.useState("Availability-page");

  // (moment(e.start).isBefore(currentDate)) ====> for checking time is not passed by comparing from current time
  // (moment(e.start).isAfter(currentDate)) ====> for checking time is passed by comparing from current time

  //Add booking modal handles
  const currentDate = moment();
  const handleOnSelectSlot = (e) => {
    if (moment(e.start).isAfter(currentDate)) {
      setAddBookingModal(true);
    } else {
      toast.error(t("Cannot Book after time"));
    }
  };
  const handleAddBookingClose = (e) => {
    setAddBookingModal(false);
  };
  //handle Event click
  const handleEventClick = (e) => {
    console.log(e);

    if (e.status === "booking") {
      setBookingModal(true);
    } else {
      toast.error(t("Can only select your bookings"));
    }
  };
  const handleBookingClose = (e) => {
    setBookingModal(false);
  };

  return (
    <>
      <CalendarComponent
        view={{ week: true, day: true }}
        events={Events}
        onSelectSlot={handleOnSelectSlot}
        onSelectEvent={handleEventClick}
      />

      {/* View Booking modal */}
      <BasicModal
        open={bookingModal}
        onClose={handleBookingClose}
        closebtn={true}
        modalMainTitle="Delete Booking"
        modalboxclassName="booking-modal"
      >
        <Divider width="100% !important" />

        <div className="booking-content">
          <Grid container spacing={3}>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("User Info")} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Booking Date")} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Booking Time")} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Duration")} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Vechicle")} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Meetup")} />
            </Grid>
          </Grid>
          <div className="booking-btn-div">
            <Grid align="right">
              <Button
                text={t("Close")}
                onClick={handleBookingClose}
                variant="outlined"
                width="110px !important"
                textColor="#363557 !important"
                margin="10px !important"
                borderColor="black !important"
              />
              <Button
                text={t("Delete")}
                type="submit"
                textColor="#FFFFFF !important"
                width="110px !important"
                color="#149E7A !important"
              />
            </Grid>
          </div>
        </div>
      </BasicModal>

      {/* add booking modal */}
      <BasicModal
        open={AddBookingModal}
        onClose={handleBookingClose}
        closebtn={true}
        modalMainTitle="Add Booking"
        modalboxclassName="booking-modal"
      >
        <Divider width="100% !important" />

        <div className="booking-content">
          <Grid container spacing={3}>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("User Info")} placeholder={t("Enter username")} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Booking Date")} placeholder={t("Add booking date")} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                label={t("Booking Time")}
                placeholder="Select booking time"
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                label={t("Duration")}
                placeholder={t("Enter duration of booking")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Vechicle")} placeholder={t("Select vechicle type")} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Meetup")} placeholder={t("Enter Meet-UP point")} />
            </Grid>
          </Grid>
          <div className="booking-btn-div">
            <Grid align="right">
              <Button
                text={t("Close")}
                onClick={handleAddBookingClose}
                variant="outlined"
                width="110px !important"
                textColor="#363557 !important"
                margin="10px !important"
                borderColor="black !important"
              />
              <Button
                text={t("Add Booking")}
                type="submit"
                textColor="#FFFFFF !important"
                width="150px !important"
                color="#149E7A !important"
              />
            </Grid>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default Calendar;
