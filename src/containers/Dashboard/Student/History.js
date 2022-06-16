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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  useEffect(() => {
    if (user && currentPage) getHistoryData(user);
  }, [user, currentPage]);

  const getHistoryData = async () => {
    let allBookings = [];
    await API(
      "get",
      `Bookings/GetBookingsByIdForAllUsers_New?id=${user.id}&role=${user.role}&sortvalue=FirstName&sortorder=ascend&QuerySearch.firstName=&pageSize=10&pageNumber=${currentPage}&startDate=&endDate=`
    ).then(async (GetBookingres) => {
      console.log("GetBookingres", GetBookingres);
      setHistoryRows([]);
      setTotalPages(GetBookingres.data.totalPages);
      let studentRes = GetBookingres.data.data.map((booking) => {
        if (user.id === booking.instructionId) {
          return API("get", `Personal/GetAllById/?id=${booking.studentId}`);
        } else if (user.id === booking.studentId) {
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

        setHistoryRows(
          temp.map((booking) => {
            return createData(
              booking.studentData.firstName + " " + booking.studentData.surName,
              moment(booking.bookingDate).format("DD/MM/YYYY"),

              booking.startTime,
              booking.duration,
              booking.status,
              booking.id,
              booking.drivingSchoolId ? booking.drivingSchoolId : booking.instructionId
            );
          })
        );
        setLoading(false);
      });
    });
  };

  const handleReBook = async (e) => {
    let selectedBooking = allBookingsWithUser.find((booking) => {
      if (booking.id === e.id) {
        return booking;
      }
    });
    localStorage.setItem("selectedInstructor", JSON.stringify(selectedBooking.studentData));
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
      {loading ? (
        <Loader></Loader>
      ) : (
        <DataTable
          data={historyRows}
          columns={Historycolumns}
          user={user}
          handleReBook={handleReBook}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></DataTable>
      )}
    </>
  );
};

export default Index;
