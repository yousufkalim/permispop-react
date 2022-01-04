import React from "react";
import CalendarComponent from "../../../../components/Common/Calendar";
import Events from "./Events";
import BasicModal from "../../../../components/Common/BasicModal";
import Divider from "../../../../components/Common/Divider";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DropDown from "../../../../components/Common/DropDown";
import DatePicker from "../../../../components/Common/DatePicker";
import TextField from "../../../../components/Common/TextField";
import Button from "../../../../components/Common/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import moment from "moment";
import { toast } from "react-toastify";

const Calendar = () => {
  const [open, setOpen] = React.useState(false);

  const [eventDeleteModal, setEventDeleteModal] = React.useState(false);
  const [bookingModal, setBookingModal] = React.useState(false);

  const [value, setValue] = React.useState("Availability-page");
  // (moment(e.start).isBefore(currentDate)) ====> for checking time is not passed by comparing from current time
  // (moment(e.start).isAfter(currentDate)) ====> for checking time is passed by comparing from current time

  //Add availability , unavailability modal handles
  const currentDate = moment();
  const handleOpen = (e) => {
    if (moment(e.start).isAfter(currentDate)) {
      setOpen(true);
    } else {
      toast.error("can not select past time");
    }
  };
  const handleClose = (e) => {
    setOpen(false);
  };

  //handle Event click
  const handleEventClick = (e) => {
    console.log(e);

    if (e.status === "booking") {
      setBookingModal(true);
    } else if (e.status === "available") {
      if (moment(e.start).isAfter(currentDate)) {
        setEventDeleteModal(true);
      } else {
        toast.error("can not select past event");
      }
    }
  };

  const handleBookingClose = (e) => {
    setBookingModal(false);
  };

  const handleDeleteClose = (e) => {
    setEventDeleteModal(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <CalendarComponent
        view={{ week: true, day: true }}
        events={Events}
        onSelectSlot={handleOpen}
        onSelectEvent={handleEventClick}
      />
      {/* Add availibility modal */}

      <BasicModal
        open={open}
        closebtn={true}
        onClose={handleClose}
        modalMainTitle="Add Event"
        modalTitleProps={{ align: "left" }}
        modalboxclassName="availability-modal"
      >
        <Divider width="100% !important" />

        <TabContext value={value}>
          <TabList onChange={handleChange} className="tab-list">
            <Tab
              className="tab"
              label="Add Availability"
              value="Availability-page"
            />
            <Divider orientation="vertical" flexItem width="4px !important" />
            <Tab
              label="Add Unavailability"
              value="Unavailability-page"
              className="tab"
            />
            <Divider orientation="vertical" flexItem width="4px !important" />

            <Tab
              className="tab"
              label="Add Personal Event"
              value="PersonalEvent-page"
            />
          </TabList>
          {/* page 1 */}
          <div className="modal-content">
            <TabPanel value="Availability-page">
              <form>
                <Grid container spacing={3}>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown
                      label="Select Instructor"
                      placeholder="Hamza"
                    ></DropDown>
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DatePicker />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="Start Hours" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="Start Minutes" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="End Hours" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="End Minutes" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="Select Vehicle" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="Meetup" placeholder="Meetup" />
                  </Grid>
                </Grid>
                {/* page 2 */}
                <Grid align="right">
                  <Button
                    text="Cancel"
                    onClick={handleClose}
                    type="submit"
                    variant="outlined"
                    width="110px !important"
                    textColor="#363557 !important"
                    margin="10px !important"
                  />
                  <Button
                    text="Confirm"
                    type="submit"
                    textColor="#FFFFFF !important"
                    width="110px !important"
                    color="#149E7A !important"
                  />
                </Grid>
              </form>
            </TabPanel>
            {/* page 3 */}
            <TabPanel value="Unavailability-page">
              <form>
                <Grid container spacing={3}>
                  <Grid xs={12} sm={12} md={12} align="left">
                    <DatePicker />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="Start Hours" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="Start Minutes" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="End Hours" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="End Minutes" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <TextField label="Description" placeholder="Description" />
                  </Grid>
                </Grid>

                <Grid align="right" style={{ marginTop: "15px" }}>
                  <Button
                    text="Cancel"
                    onClick={handleClose}
                    type="submit"
                    variant="outlined"
                    width="110px !important"
                    textColor="#363557 !important"
                    margin="10px !important"
                  />
                  <Button
                    text="Confirm"
                    type="submit"
                    textColor="#FFFFFF !important"
                    width="110px !important"
                    color="#149E7A !important"
                  />
                </Grid>
              </form>
            </TabPanel>

            <TabPanel value="PersonalEvent-page">
              <form>
                <Grid container spacing={3}>
                  <Grid xs={12} sm={12} md={12} align="left">
                    <DatePicker />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="Start Hours" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="Start Minutes" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="End Hours" />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown label="End Minutes" />
                  </Grid>
                  <Grid xs={12} sm={12} md={12}>
                    <TextField label="Description" placeholder="Description" />
                  </Grid>
                </Grid>

                <Grid align="right">
                  <Button
                    text="Cancel"
                    onClick={handleClose}
                    type="submit"
                    variant="outlined"
                    width="110px !important"
                    textColor="#363557 !important"
                    margin="10px !important"
                  />
                  <Button
                    text="Confirm"
                    type="submit"
                    textColor="#FFFFFF !important"
                    width="110px !important"
                    color="#149E7A !important"
                  />
                </Grid>
              </form>
            </TabPanel>
          </div>
        </TabContext>
      </BasicModal>
      {/* Delete availibility modal */}
      <BasicModal
        open={eventDeleteModal}
        onClose={handleDeleteClose}
        closebtn={true}
        modalMainTitle="Delete Availability"
        modalboxclassName="delete-availability"
      >
        <Divider />
        <Typography gutterBottom className="delete-availability-text">
          <InfoOutlinedIcon className="info-icon" />
          Would like to delete your availability?
        </Typography>
        <Grid align="right" className="delete-availability-btn-div">
          <Button
            text="No"
            onClick={handleDeleteClose}
            variant="outlined"
            width="110px !important"
            textColor="#363557 !important"
            margin="10px !important"
          />
          <Button
            text="Yes"
            type="submit"
            textColor="#FFFFFF !important"
            width="110px !important"
            color="#149E7A !important"
          />
        </Grid>
      </BasicModal>
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
              <TextField label="User Info" height="10px" />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label="Booking Date" />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label="Booking Time" />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label="Duration" />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label="Vechicle" />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label="Meetup" />
            </Grid>
          </Grid>
          <div className="booking-btn-div">
            <Grid align="right">
              <Button
                text="Close"
                onClick={handleBookingClose}
                variant="outlined"
                width="110px !important"
                textColor="#363557 !important"
                margin="10px !important"
              />
              <Button
                text="Delete"
                type="submit"
                textColor="#FFFFFF !important"
                width="110px !important"
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
