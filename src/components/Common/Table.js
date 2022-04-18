import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "../../components/Common/Button";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

export default function DataTable(props) {
  const history = useHistory();
  const handleReBook = () => history.push("/student/booking");
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <div
      className="container"
      style={{
        width: "90%",
        margin: "0px auto 20px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}
      >
        {props.filters}
      </div>
      {props.children}

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table" {...props.tableProps}>
            <TableHead>
              <TableRow>
                {props.columns
                  ? props.columns.map((column) => (
                      <TableCell
                        sx={{
                          fontFamily: "Inter !important",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "18px !important",
                          lineHeight: "22px !important",

                          letterSpacing: "-0.03em",

                          color: "#424851",
                        }}
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))
                  : "No data found"}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data
                ? props.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.bookingwith}
                        >
                          {props.columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <>
                                {column.id !== "options" &&
                                column.id !== "action" &&
                                column.id !== "Vaction" &&
                                column.id !== "historyActions" &&
                                column.id !== "actions" ? (
                                  <TableCell
                                    sx={{
                                      fontFamily: "Inter !important",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      fontSize: "15px !important",
                                      lineHeight: "50px !important",

                                      letterSpacing: "-0.03em",

                                      color:
                                        column.id === "status" ||
                                        column.id === "gearbox"
                                          ? "#FFA333"
                                          : "#81878E",
                                    }}
                                    color={row.color}
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                ) : column.id === "actions" ? (
                                  <TableCell align="right">
                                    <FormControl>
                                      <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={row.status}
                                        disabled={
                                          row.status === "Dispute" ||
                                          row.status === "Complete" ||
                                          row.status === "Closed"
                                            ? true
                                            : false
                                        }
                                        defaultValue={0}
                                        onChange={(e) => {
                                          props.updateStatus(
                                            row.id,
                                            e.target.value
                                          );
                                        }}
                                        sx={{
                                          fontSize: "14px",
                                          color: "#149E7A",
                                          background: "#E8FEED",
                                          display: "flex",
                                          justifyContent: "center",
                                          textAlign: "center",
                                        }}
                                      >
                                        <MenuItem
                                          name="In progress"
                                          value="In progress"
                                          disabled
                                          sx={{
                                            paddingTop: "0px !important",
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          In Progress
                                        </MenuItem>

                                        <MenuItem
                                          value={
                                            row.status === "In progress"
                                              ? props.user.role === "Student"
                                                ? "Closed"
                                                : "Complete"
                                              : row.status
                                          }
                                          name={
                                            row.status === "In progress"
                                              ? props.user.role === "Student"
                                                ? "Closed"
                                                : "Complete"
                                              : row.status
                                          }
                                          sx={{
                                            paddingTop: "0px !important",
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          {row.status === "In progress"
                                            ? props.user.role === "Student"
                                              ? "Closed"
                                              : "Complete"
                                            : row.status}
                                        </MenuItem>

                                        <MenuItem
                                          value="Dispute"
                                          name="Dispute"
                                          sx={{
                                            paddingTop: "0px !important",
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          Dispute
                                        </MenuItem>
                                      </Select>
                                      {/* <Modal
                                        // aria-labelledby="spring-modal-title"
                                        // aria-describedby="spring-modal-description"
                                        // closeAfterTransition
                                        // BackdropComponent={Backdrop}
                                        // BackdropProps={{
                                        //   timeout: 500,
                                        // }}
                                        open={openDisputeModal}
                                        onClose={() =>
                                          setOpenDisputeModal(false)
                                        }
                                        component={
                                          // <CreateDisputeModal userID={row.id} />
                                          <p>xyz</p>
                                        }
                                      /> */}
                                    </FormControl>
                                  </TableCell>
                                ) : column.id === "historyActions" ? (
                                  <TableCell align="center">
                                    <Button
                                      type="submit"
                                      text="Re-Book"
                                      color="#149E7A !important"
                                      width="100% !important"
                                      margin="0px 0px 10px 0px !important"
                                      height="50px !important"
                                      onClick={handleReBook}
                                    ></Button>
                                  </TableCell>
                                ) : column.id === "action" ? (
                                  <TableCell align="center">
                                    <Button
                                      type="submit"
                                      text="Detach"
                                      color="#149E7A !important"
                                      width="60% !important"
                                      margin="0px 0px 10px 0px !important"
                                      height="50px !important"
                                      onClick={(e) =>
                                        props.detachInstructor(index)
                                      }
                                    ></Button>
                                    <Button
                                      type="submit"
                                      text="Delete"
                                      color="#149E7A !important"
                                      width="60% !important"
                                      margin="0px 0px 10px 0px !important"
                                      height="50px !important"
                                      onClick={(e) =>
                                        props.deleteInstructor(index)
                                      }
                                    ></Button>
                                    <Button
                                      type="submit"
                                      text="Add Meetup Point"
                                      color="#149E7A !important"
                                      width="60% !important"
                                      height="50px !important"
                                      onClick={(e) => props.open(true)}
                                    ></Button>
                                  </TableCell>
                                ) : column.id === "Vaction" ? (
                                  <TableCell align="center">
                                    <Button
                                      type="submit"
                                      text="Edit"
                                      width="100% !important"
                                      margin="0px 0px 10px 0px !important"
                                      height="50px !important"
                                      onClick={(e) => props.open(index)}
                                    ></Button>
                                    <Button
                                      type="submit"
                                      text="Delete"
                                      color="#149E7A !important"
                                      width="100% !important"
                                      margin="0px 0px 10px 0px !important"
                                      height="50px !important"
                                      onClick={(e) =>
                                        props.handleDeleteVehicle(index)
                                      }
                                    ></Button>
                                  </TableCell>
                                ) : (
                                  <TableCell align="center">
                                    <IconButton>
                                      <MoreVertIcon />
                                    </IconButton>
                                    <IconButton>
                                      <MoreVertIcon />
                                    </IconButton>
                                    <IconButton>
                                      <MoreVertIcon />
                                    </IconButton>
                                  </TableCell>
                                )}
                              </>
                            );
                          })}
                        </TableRow>
                      );
                    })
                : "No data found"}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Pagination
        count={10}
        color="secondary"
        shape="rounded"
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      />
      <></>
    </div>
  );
}
