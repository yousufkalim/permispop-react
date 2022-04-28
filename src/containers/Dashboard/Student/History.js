import React, { useState, useEffect } from "react";
import DataTable from "../../../components/Common/Table";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Historycolumns } from "../../../utils/tableHeads";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";
import DatePicker from "../../../components/Common/DatePicker";
import MobileViewFilters from "../../../components/Common/MobileViewFilters";
import Divider from "../../../components/Common/Divider";
import API from "../../../api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useHistory } from "react-router-dom";

function createData(bookingwith, date, startTime, duration, status, id) {
  return { bookingwith, date, startTime, duration, status, id };
}
const Index = () => {
  const { i18n, t } = useTranslation();
  const [Startvalue, setStartValue] = useState(new Date());
  const [Endvalue, setEndValue] = useState(new Date());
  const [pendingRequestsrows, setPendingRequestsrows] = useState([]);
  const [allBookingsWithUser, setAllBookingsWithUser] = useState([]);
  const [user, setUser] = useState();
  const [selectedUserData, setSelectedUserData] = useState([]);
  const history = useHistory();

  const handleStartdate = (newValue) => {
    setStartValue(newValue);
  };
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
      `Bookings/GetBookingsByIdForAllUsers_New?id=${userData.id}&role=${userData.role}&sortvalue=FirstName&sortorder=ascend&QuerySearch.firstName=&pageSize=100&pageNumber=1&startDate=&endDate=`
    ).then(async (GetBookingres) => {
      let studentRes = GetBookingres.data.data.map((booking) => {
        if (userData.id === booking.instructionId) {
          return API("get", `Personal/GetAllById/?id=${booking.studentId}`);
        } else if (userData.id === booking.studentId) {
          return API("get", `Personal/GetAllById/?id=${booking.instructionId}`);
        }
      });
      Promise.all(studentRes).then((res) => {
        GetBookingres.data.data.map((booking) => {
          let userdata = res.find((user) => {
            if (booking.studentId === user.data.data.id) {
              return user;
            } else if (booking.instructionId === user.data.data.id) {
              return user;
            }
          });
          booking["studentData"] = userdata.data.data;
          allBookings.push(booking);
        });

        setAllBookingsWithUser(allBookings);

        let temp = allBookings.filter((booking) => {
          if (booking.status != "In progress") {
            return booking;
          }
        });

        setPendingRequestsrows(
          temp.map((booking) => {
            return createData(
              booking.studentData.firstName + " " + booking.studentData.surName,
              moment(booking.bookingDate).format("DD/MM/YYYY"),

              booking.startTime,
              booking.duration,
              booking.status,
              booking.id,
              booking.drivingSchoolId
                ? booking.drivingSchoolId
                : booking.instructionId
            );
          })
        );
      });
    });
  };

  const handleReBook = async (e) => {
    let selectedBooking = allBookingsWithUser.find((booking) => {
      if (booking.id === e.id) {
        return booking;
      }
    });
    localStorage.setItem(
      "selectedInstructor",
      JSON.stringify(selectedBooking.studentData)
    );
    history.push("/student/InstructorBooking");
  };

  return (
    <>
      {/* <MobileViewFilters title={t("History")} /> */}
      <div className="Filters">
        <Grid container spacing={1} sx={{ marginTop: "30px" }}>
          <Grid xs={12} sm={12} md={4}>
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
              {t("History")}
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
              // label={["date"]}
              value={Endvalue}
              onChange={handleEnddate}
            ></DatePicker>
          </Grid> */}
        </Grid>
      </div>

      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      {pendingRequestsrows.length > 0 && (
        <DataTable
          data={pendingRequestsrows}
          columns={Historycolumns}
          user={user}
          handleReBook={handleReBook}
        ></DataTable>
      )}
    </>
  );
};

export default Index;
