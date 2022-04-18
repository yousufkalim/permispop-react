import React, { useState, useEffect } from "react";
import CalendarComponent from "../../../../components/Common/Calendar";
import Events from "./Events";
import BasicModal from "../../../../components/Common/BasicModal";
import Divider from "../../../../components/Common/Divider";
import TextField from "../../../../components/Common/TextField";
import Button from "../../../../components/Common/Button";
import API from "../../../../api/index";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { toast } from "react-toastify";
import { Views } from "react-big-calendar";

const Calendar = () => {
  const currentDate = moment();
  const [user, setUser] = useState();
  const [update, setUpdate] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [bookings, setBookings] = React.useState([]);
  const [selectedBooking, setSelectedBooking] = useState({});
  const [bookingModal, setBookingModal] = React.useState(false);
  const [AddBookingModal, setAddBookingModal] = React.useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    getBookingData(userData);
  }, [update]);

  const getBookingData = (userData) => {
    API("get", `Bookings/GetBookingsByStudent?id=${userData.id}`).then(
      (res) => {
        let allBookings = [];
        res.data.data.map((booking) => {
          let date = moment(booking.bookingDate).format("YYYY-MM-DD");
          date = date.split("-");
          let start = booking.startTime.split(":");
          let end = moment(booking.endTime).format("HH:mm");
          end = end.split(":");
          allBookings.push({
            id: booking.id,
            title: "Booking By " + booking.instructorQuestionFifth,
            start: new Date(
              date[0],
              parseInt(date[1]) - 1,
              date[2],
              parseInt(start[0]) + 5,
              start[1],
              0
            ),
            end: new Date(
              date[0],
              parseInt(date[1]) - 1,
              date[2],
              end[0],
              end[1],
              0
            ),
            bookingTime:
              booking.startTime +
              " - " +
              moment(booking.endTime).format("HH:mm"),
            status: booking.status,
            meetingPlace: booking.meetingPlace,
            duration: booking.duration,
            vehicleId: booking.vehicleId,
          });
        });
        setBookings(allBookings);
      }
    );
  };

  //Add booking modal handles
  const handleOnSelectSlot = (e) => {
    if (moment(e.start).isAfter(currentDate)) {
      setAddBookingModal(true);
    } else {
      toast.error("Cannot Book after time");
    }
  };

  const handleAddBookingClose = (e) => {
    setAddBookingModal(false);
  };
  //handle Event click
  const handleEventClick = (e) => {
    setSelectedBooking(e);
    setBookingModal(true);
  };

  const handleBookingClose = (e) => {
    setBookingModal(false);
  };

  const handleBookingDelete = async () => {
    setdisabled(true);

    let start = moment(selectedBooking.start).format("HH:mm");
    let end = moment(selectedBooking.end).format("HH:mm");
    start = start.split(":");
    end = end.split(":");
    start = parseInt(start[0]) - 5 + ":" + start[1];
    end = parseInt(end[0]) - 5 + ":" + end[1];

    await API(
      "delete",
      `Bookings/DeleteBookingById_Neww?id=${selectedBooking.id}&StartTime=${start}&Endtime=${end}&status=deleted`
    )
      .then((res) => {
        setUpdate(!update);
        handleBookingClose();
        setdisabled(false);
      })
      .catch((err) => {
        console.log("err", err);
        setdisabled(false);
      });
  };

  return (
    <>
      <CalendarComponent
        view={{ week: true, day: true }}
        events={bookings}
        // onSelectSlot={handleOnSelectSlot}
        onSelectEvent={handleEventClick}
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
        // onNavigate={(e) => {
        //   onNavigate(e, Views.WEEK);
        // }}
      />

      {/* View Booking modal */}
      <BasicModal
        open={bookingModal}
        onClose={handleBookingClose}
        closebtn={true}
        modalMainTitle="Booking"
        modalboxclassName="booking-modal"
      >
        <div className="booking-content">
          <Grid container spacing={3}>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                label="User Info"
                height="10px"
                value={selectedBooking.title}
                disabled={true}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                label="Booking Date"
                disabled={true}
                value={moment(selectedBooking.start).format("DD-MM-YYYY")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                label="Booking Time"
                disabled={true}
                value={selectedBooking.bookingTime}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                label="Duration"
                disabled={true}
                value={selectedBooking.duration}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                label="Vechicle"
                disabled={true}
                value={selectedBooking.vehicleId}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                label="Meetup"
                disabled={true}
                value={selectedBooking.meetingPlace}
              />
            </Grid>
          </Grid>
          <div className="booking-btn-div">
            <Grid align="right">
              <Button
                text="Delete"
                textColor="#FFFFFF !important"
                width="110px !important"
                color="#149E7A !important"
                onClick={handleBookingDelete}
                disabled={disabled}
              />
            </Grid>
          </div>
        </div>
      </BasicModal>

      {/* add booking modal */}
      {/* <BasicModal
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
              <TextField label="User Info" placeholder="Enter username " />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label="Booking Date" placeholder="Add booking date" />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                label="Booking Time"
                placeholder="Select booking time"
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                label="Duration"
                placeholder="Enter duration of booking"
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label="Vechicle" placeholder="Select vechicle type" />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label="Meetup" placeholder="Enter Meet-UP point" />
            </Grid>
          </Grid>
          <div className="booking-btn-div">
            <Grid align="right">
              <Button
                text="Close"
                onClick={handleAddBookingClose}
                variant="outlined"
                width="110px !important"
                textColor="#363557 !important"
                margin="10px !important"
                borderColor="black !important"
              />
              <Button
                text="Add Booking"
                type="submit"
                textColor="#FFFFFF !important"
                width="150px !important"
                color="#149E7A !important"
              />
            </Grid>
          </div>
        </div>
      </BasicModal> */}
    </>
  );
};

export default Calendar;
