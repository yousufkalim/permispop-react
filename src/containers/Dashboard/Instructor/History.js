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
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Loader from "../../../components/Common/FullScreenLoader";

function createData(bookingwith, date, startTime, duration, status, id) {
  return { bookingwith, date, startTime, duration, status, id };
}
const Index = () => {
  const { i18n, t } = useTranslation();

  const [historyRows, setHistoryRows] = useState([]);
  const [allBookingsWithUser, setAllBookingsWithUser] = useState([]);
  const [user, setUser] = useState();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getHistoryData(userData);
    setUser(userData);
  }, []);

  const getHistoryData = async (userData) => {
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
        let temp = allBookings.map((booking) => {
          return createData(
            booking.studentData.firstName + " " + booking.studentData.surName,
            moment(booking.bookingDate).format("DD/MM/YYYY"),
            booking.startTime,
            booking.duration,
            booking.status,
            booking.id
          );
        });
        setHistoryRows(temp.filter((item) => item.status !== "In progress"));
        setLoading(false);
      });
    });
  };

  const handleReBook = async (e) => {
    history.push("/instructor/mycalendar");
  };

  return (
    <>
      {/* <MobileViewFilters title={t("History")} /> */}
      <div className="Filters">
        <Grid container spacing={1} sx={{ marginTop: "30px", marginLeft: "1%" }}>
          <Grid xs={12} sm={12} md={3}>
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
          {/* <Grid xs={3} sm={3} md={2}>
            <MultipleSelectPlaceholder
              value={["All"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={3} sm={3} md={2}>
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
      {loading ? (
        <Loader></Loader>
      ) : (
        <DataTable data={historyRows} columns={Historycolumns} user={user} handleReBook={handleReBook}></DataTable>
      )}
    </>
  );
};

export default Index;
