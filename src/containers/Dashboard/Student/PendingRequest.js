import React, { useState, useEffect } from "react";
import DataTable from "../../../components/Common/Table";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PendingRequestcolumns } from "../../../utils/tableHeads";
import { pendingRequestsrows } from "../../../utils/tablerows";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";
import DatePicker from "../../../components/Common/DatePicker";
import Divider from "../../../components/Common/Divider";
import MobileViewFilters from "../../../components/Common/MobileViewFilters";
import Button from "../../../components/Common/Button";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import API from "../../../api";
import moment from "moment";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function createData(bookingwith, date, startTime, duration, status, id) {
  return { bookingwith, date, startTime, duration, status, id };
}
const Index = () => {
  const { i18n, t } = useTranslation();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
  const [pendingRequestsrows, setPendingRequestsrows] = useState([]);
  const [Startvalue, setStartValue] = useState(new Date());
  const [updatefield, SetUpdateField] = useState("");
  const [allBookingsWithUser, setAllBookingsWithUser] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [openDisputeModal, setOpenDisputeModal] = useState(false);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState();

  const handleStartdate = (newValue) => {
    setStartValue(newValue);
  };
  const [Endvalue, setEndValue] = useState(new Date());
  const handleEnddate = (newValue) => {
    setEndValue(newValue);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getPendingRequestData(userData);
    setUser(userData);
  }, []);

  const getPendingRequestData = async (userData) => {
    let allBookings = [];
    await API(
      "get",
      `Bookings/GetBookingsByIdForAllUsers_New?id=${userData.id}&role=${userData.role}&sortvalue=FirstName&sortorder=ascend&QuerySearch.firstName=&pageSize=10&pageNumber=1&startDate=&endDate=`
    ).then(async (GetBookingres) => {
      let studentRes = GetBookingres.data.data.map((booking) => {
        if (userData.id === booking.instructionId) {
          return API("get", `Personal/GetAllById/?id=${booking.studentId}`);
        } else if (userData.id === booking.studentId) {
          return API("get", `Personal/GetAllById/?id=${booking.instructionId}`);
        }
      });
      Promise.all(studentRes).then((res) => {
        res.map((student) => {
          GetBookingres.data.data.map((booking) => {
            if (booking.studentId === student.data.data.id) {
              booking["studentData"] = student.data.data;
              allBookings.push(booking);
            } else if (booking.instructionId === student.data.data.id) {
              booking["studentData"] = student.data.data;
              allBookings.push(booking);
            }
          });
        });
        setAllBookingsWithUser(allBookings);
        setPendingRequestsrows(
          allBookings.map((booking) => {
            return createData(
              booking.studentData.firstName + " " + booking.studentData.surName,
              moment(booking.bookingDate).format("DD/MM/YYYY"),
              booking.startTime,
              booking.duration,
              booking.status,
              booking.id
            );
          })
        );
      });
    });
  };

  const updateStatus = async (id, status) => {
    console.log();
    allBookingsWithUser.map((booking) => {
      if (id === booking.id) {
        setSelectedUserData(booking.studentData);
      }
    });
    if (
      status == t("Complete") ||
      status == t("In progress") ||
      status == t("Closed")
    ) {
      await API(
        "get",
        `Bookings/UpdateBookingsStatus?id=${id}&status=${status}`
      ).then((res) => {
        getPendingRequestData(user);
        toast.success(t("Status is updated successful"));
      });
    } else {
      openDisputeModal = setOpenDisputeModal(true);
    }
  };

  const createDispute = async (id) => {
    console.log("setSelectedUserData", user.role);

    const userID = JSON.parse(localStorage.getItem("user"));
    if (updatefield != "" && comment != "") {
      await API("post", `Dispute`, {
        Dispute: updatefield,
        comment: comment,
        InstructorID: user.role === "Student" ? selectedUserData.id : user.id,
        instructorName: user.firstName ? user.firstName : "",
        DisputingFrom: user.role ? user.role : "",
        feedBackDate: new Date(),
        studentName: selectedUserData.firstName
          ? selectedUserData.firstName
          : "",
        studentName: selectedUserData.firstName
          ? selectedUserData.firstName
          : "",
        studentID: user.role === "Student" ? user.id : selectedUserData.id,
      }).then((disputeres) => {
        console.log("data", disputeres.data.data);
        toast.success(t("Dispute is created sucessfully"));
        SetUpdateField("");
        setComment("");
        setOpenDisputeModal(false);
      });
    } else {
      toast.error(t("Field cannot be empty"));
    }
  };
  return (
    <>
      {/* <MobileViewFilters title={t("Pending requests")} /> */}
      <div className="Filters">
        <Grid container spacing={1} sx={{ marginTop: "30px" }}>
          <Grid xs={12} sm={6} md={4}>
            <Typography
              sx={{
                marginTop: "20px",
                paddingLeft: "80px",
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 400,
                fontSize: "24px",
                lineHight: "34px",
                /* identical to box height */

                color: "#2A3235",
              }}
            >
              {t("Pending Request")}
            </Typography>
          </Grid>
          {/* <Grid xs={12} sm={6} md={2}>
            <MultipleSelectPlaceholder
              value={["All"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <MultipleSelectPlaceholder
              value={["Filter by receiver"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="Start Date"
              value={Startvalue}
              onChange={handleStartdate}
            ></DatePicker>
          </Grid>

          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="End Date"
              value={Endvalue}
              onChange={handleEnddate}
            ></DatePicker>
          </Grid> */}
        </Grid>
      </div>

      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />

      <DataTable
        updateStatus={updateStatus}
        data={pendingRequestsrows}
        columns={PendingRequestcolumns}
        SetUpdateField={SetUpdateField}
        user={user}
      ></DataTable>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openDisputeModal}
        onClose={() => setOpenDisputeModal(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontWeight: "550" }}
            >
              {t("Give disputes")}
            </FormLabel>
            <RadioGroup>
              <FormControlLabel
                value="Latedelivery"
                control={<Radio />}
                label={t("Late delivery")}
                onChange={(e) => SetUpdateField(e.target.value)}
              />
              <FormControlLabel
                value="Payment issue"
                control={<Radio />}
                label={t("Payment issue")}
                onChange={(e) => SetUpdateField(e.target.value)}
              />
              <FormControlLabel
                value="Harrasment"
                control={<Radio />}
                label={t("Harrasment")}
                onChange={(e) => SetUpdateField(e.target.value)}
              />
              <FormControlLabel
                value="AbusingLanguage"
                control={<Radio />}
                label={t("Abusing Language")}
                onChange={(e) => SetUpdateField(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
          <Typography
            sx={{
              color: "#110000",
              marginBottom: "3px",
              marginTop: "5%",
              fontWeight: "550",
            }}
          >
            {t("Comments")}
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder={t("Comments")}
            name="comment"
            onChange={(e) => setComment(e.target.name)}
            style={{ width: "100%", borderRadius: "5px", padding: "2%" }}
          />
          <div style={{ marginTop: "2%" }}>
            <Button
              text={t("Update Profile")}
              width="95% !important"
              color="#149e7a"
              borderRadius="10px"
              onClick={(e) => createDispute(e)}
            ></Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Index;
