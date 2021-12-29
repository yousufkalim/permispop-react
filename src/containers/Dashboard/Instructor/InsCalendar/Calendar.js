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

const Calendar = () => {
  const [open, setOpen] = React.useState(false);
  const [eventDeleteModal, setEventDeleteModal] = React.useState(false);
  const [value, setValue] = React.useState("Availability-page");

  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleDeleteModal = (e) => {
    setEventDeleteModal(true);
  };
  const handleClose = (e) => {
    setOpen(false);
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
        view={{ month: true, week: true, day: true }}
        events={Events}
        onSelectSlot={handleOpen}
        onSelectEvent={handleDeleteModal}
      />
      {/* Add availibility modal */}

      <BasicModal
        open={open}
        closebtn={true}
        onClose={handleClose}
        modalTitle="Add Event"
        modalTitleProps={{ align: "left" }}
        modalTitleclassName="Event_modal_title"
        modalboxclassName="modal"
      >
        <Divider />

        <TabContext value={value}>
          <TabList onChange={handleChange} className="tab-list">
            <Tab label="Add Availability" value="Availability-page" />
            <Tab label="Add Unavailability" value="Unavailability-page" />
            <Tab label="Add Personal Event" value="PersonalEvent-page" />
          </TabList>

          <TabPanel value="Availability-page">
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown
                    label="Select Instructor"
                    placeholder="Hamza"
                  ></DropDown>
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DatePicker placeholder="18-11-2019" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="Start Hours" placeholder="00" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="Start Minutes" placeholder="00" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="End Hours" placeholder="00" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="End Minutes" placeholder="00" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown
                    label="Select Vehicle"
                    placeholder="Select Vehicle"
                  />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="Meetup" placeholder="Meetup" />
                </Grid>
              </Grid>
              <Button
                type="submit"
                textColor="#FFFFFF"
                text="Cancel"
                onClick={handleClose}
              />
              <Button type="submit" textColor="#FFFFFF" text="Confirm" />
            </form>
          </TabPanel>

          <TabPanel value="Unavailability-page">
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={6}>
                  <DatePicker placeholder="18-11-2019" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="Start Hours" placeholder="00" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="Start Minutes" placeholder="00" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="End Hours" placeholder="00" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="End Minutes" placeholder="00" />
                </Grid>
              </Grid>
              <Grid xs={12} sm={12} md={6}>
                <TextField label="Description" placeholder="Description" />
              </Grid>
              <Button
                type="submit"
                textColor="#FFFFFF"
                text="Cancel"
                onClick={handleClose}
              />
              <Button type="submit" textColor="#FFFFFF" text="Confirm" />
            </form>
          </TabPanel>

          <TabPanel value="PersonalEvent-page">
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={6}>
                  <DatePicker placeholder="18-11-2019" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="Start Hours" placeholder="00" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="Start Minutes" placeholder="00" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="End Hours" placeholder="00" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <DropDown label="End Minutes" placeholder="00" />
                </Grid>
              </Grid>
              <Grid xs={12} sm={12} md={6}>
                <TextField label="Description" placeholder="Description" />
              </Grid>
              <Button
                type="submit"
                textColor="#FFFFFF"
                text="Cancel"
                onClick={handleClose}
              />
              <Button type="submit" textColor="#FFFFFF" text="Confirm" />
            </form>
          </TabPanel>
        </TabContext>
      </BasicModal>
      {/* Delete availibility modal */}
      <BasicModal
        open={eventDeleteModal}
        onClose={handleDeleteClose}
        closebtn={true}
        modalTitle="Delete Availability"
        modalTitleProps={{ align: "left" }}
      >
        <Divider />
        <Typography variant="h4" gutterBottom>
          {/* <InfoOutlinedIcon style={{ fontSize: large }} /> */}
          Would like to delete your Availability?
        </Typography>
        <Button text="No" onClick={handleDeleteClose} />
        <Button text="Yes" onClick={handleDeleteClose} />
      </BasicModal>
      {/* View Booking modal */}
      <BasicModal
        open={eventDeleteModal}
        onClose={handleDeleteClose}
        closebtn={true}
        modalTitle="Booking"
        modalTitleProps={{ align: "left" }}
      >
        <Grid>
          <TextField label="User Info" />
          <TextField label="Booking Date" />
          <TextField label="Booking Time" />
          <TextField label="Duration" />
          <TextField label="Vechicle" />
          <TextField label="Meetup" />
        </Grid>
        <Button text="Close" onClick={handleDeleteClose} />
        <Button text="Delete" onClick={handleDeleteClose} />
      </BasicModal>
    </>
  );
};

export default Calendar;
