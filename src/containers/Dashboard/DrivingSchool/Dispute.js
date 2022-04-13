import React, { useState, useEffect } from "react";
import Divider from "../../../components/Common/Divider";
import API from "../../../api";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Index = () => {
  const [dispute, setDispute] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getDisputes(userData);
    setUser(userData);
  }, []);

  const getDisputes = async (userData) => {
    console.log("s", userData);
    if (userData.role === "Student") {
      await API(
        "get",
        `Dispute/GetAllDisputeByStudentId/?id=${userData.id}`
      ).then((res) => {
        console.log("res", res.data.data);
        setDispute(res.data.data);
      });
    } else {
      await API(
        "get",
        `Dispute/GetAllDisputeByInstructorId/?id=${userData.id}`
      ).then((res) => {
        console.log("res", res.data.data);
        setDispute(res.data.data);
      });
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "90%", marginLeft: "5%" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Dispute</TableCell>
              <TableCell>FeedBack Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Disputing From</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dispute.length > 0 &&
              dispute.map((row) => (
                <>
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ padding: "35px 16px !important" }}
                    >
                      {row.dispute ? row.dispute : ""}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.feedBackDate}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "#FFA333" }}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.comment}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        color: "#149e7a",
                      }}
                      align="right"
                    >
                      <div
                        style={{
                          background: "#E8FEED",
                          width: "85%",
                          padding: "10% 0",
                          borderRadius: "10px",
                        }}
                      >
                        {row.disputingFrom}
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
        </Table>
      </TableContainer>
    </>
  );
};

export default Index;
