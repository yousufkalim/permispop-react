import React, { useState, useEffect } from "react";
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
import BasicModal from "../../components/Common/BasicModal";
import { ReactComponent as Comment } from "../../assets/images/ChatIcon.svg";
import { ReactComponent as Profile } from "../../assets/images/Profile.svg";
import { ReactComponent as Book } from "../../assets/images/Book.svg";
import { ReactComponent as ReBook } from "../../assets/images/Rebook.svg";
import { ReactComponent as Edit } from "../../assets/images/EditIcon.svg";
import { ReactComponent as Delete } from "../../assets/images/DeleteIcon.svg";
import Tooltip from "@mui/material/Tooltip";

import { useTranslation } from "react-i18next";

export default function DataTable(props) {
  const { i18n, t } = useTranslation();

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
                {props.columns ? (
                  props.columns.map((column) => (
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
                      {t(column.label)}
                    </TableCell>
                  ))
                ) : (
                  <TableHead>
                    <TableRow>
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
                      >
                        {t("No data found")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.length > 0 ? (
                props.data
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.bookingwith}>
                        {props.columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <>
                              {column.id !== "options" &&
                              column.id !== "action" &&
                              column.id !== "Vaction" &&
                              column.id !== "historyActions" &&
                              column.id !== "actions" &&
                              column.id !== "photo" &&
                              column.id !== "name" &&
                              column.id !== "position" &&
                              column.id !== "reservations" &&
                              column.id !== "profile" &&
                              column.id !== "chat" ? (
                                <TableCell
                                  sx={{
                                    fontFamily: "Inter !important",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    fontSize: "15px !important",
                                    lineHeight: "50px !important",

                                    letterSpacing: "-0.03em",

                                    color: column.id === "status" || column.id === "gearbox" ? "#FFA333" : "#81878E",
                                  }}
                                  color={row.color}
                                  key={column.id}
                                  align={column.align}
                                >
                                  {column.format && typeof value === "number" ? column.format(value) : value}
                                </TableCell>
                              ) : column.id === "actions" ? (
                                <TableCell align="right">
                                  <FormControl>
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={row.status}
                                      disabled={
                                        row.status === "Dispute" || row.status === "Complete" || row.status === "Closed"
                                          ? true
                                          : false
                                      }
                                      defaultValue={0}
                                      onChange={(e) => {
                                        props.updateStatus(row.id, e.target.value);
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
                                  </FormControl>
                                </TableCell>
                              ) : column.id === "historyActions" ? (
                                <TableCell align="center">
                                  <Tooltip title="Re-Book">
                                    <IconButton
                                      onClick={() => props.handleReBook(row)}
                                      className="Profilicon"
                                      style={{ padding: "2% 2% 1% 2%" }}
                                    >
                                      <ReBook style={{ padding: "20%" }} className="profilesvg" />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              ) : column.id === "action" ? (
                                <TableCell align="center">
                                  <Button
                                    type="submit"
                                    text={t("Detach")}
                                    color="#149E7A !important"
                                    width="60% !important"
                                    margin="0px 0px 10px 0px !important"
                                    height="50px !important"
                                    onClick={(e) => props.detachInstructor(index)}
                                  ></Button>
                                  <Button
                                    type="submit"
                                    text={t("Delete")}
                                    color="#149E7A !important"
                                    width="60% !important"
                                    margin="0px 0px 10px 0px !important"
                                    height="50px !important"
                                    onClick={(e) => props.deleteInstructor(index)}
                                  ></Button>
                                  <Button
                                    type="submit"
                                    text={t("Add Meetup Point")}
                                    color="#149E7A !important"
                                    width="60% !important"
                                    height="50px !important"
                                    onClick={(e) => props.open(true)}
                                  ></Button>
                                </TableCell>
                              ) : column.id === "Vaction" ? (
                                <TableCell align="center">
                                  <Tooltip title="Edit">
                                    <IconButton
                                      onClick={(e) => props.open(index)}
                                      className="Profilicon"
                                      sx={{ padding: "5%", marginRight: "3%" }}
                                    >
                                      <Edit className="profilesvg" style={{ padding: "15%" }} />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={(e) => props.handleBookingDeleteModal(index)}
                                      className="Profilicon"
                                      sx={{ padding: "3.5% 6% 3.5% 6%" }}
                                    >
                                      <Delete className="profilesvg" style={{ padding: "15%" }} />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              ) : column.id === "photo" ? (
                                <TableCell align="center">
                                  <img
                                    className="home-logo img-fluid w-75"
                                    src={row.photo}
                                    height={50}
                                    width={50}
                                    style={{ borderRadius: 100 }}
                                  />
                                </TableCell>
                              ) : column.id === "name" ? (
                                <TableCell align="center">
                                  {row.firstName} {row.surName}
                                </TableCell>
                              ) : column.id === "position" ? (
                                <TableCell align="center">
                                  {row.address} {row.zip} {row.city}
                                </TableCell>
                              ) : column.id === "reservations" ? (
                                <TableCell align="center">
                                  <Tooltip title="Re-Book">
                                    <IconButton
                                      onClick={() => props.handleReservation(row)}
                                      className="Profilicon"
                                      style={{ padding: "2% 3% 2% 3%", marginRight: "2%" }}
                                    >
                                      <ReBook style={{ padding: "20%" }} className="profilesvg" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Profile">
                                    <IconButton
                                      onClick={() => {
                                        props.setIsSelected(row.id);
                                        props.handleProfile(row);
                                      }}
                                      className={props.isSelected == row.id ? "selectedProfile" : "Profilicon"}
                                      sx={{
                                        marginRight: "2%",
                                        padding: "3% 2% 3% 2% ",
                                      }}
                                    >
                                      <Profile
                                        style={{ padding: "20%" }}
                                        className={props.isSelected == row.id ? "SelectedIcon" : "profilesvg"}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Chat">
                                    <IconButton
                                      onClick={() => props.handleChat(row)}
                                      className="Profilicon"
                                      sx={{
                                        padding: "3% 2% 3% 2% ",
                                      }}
                                    >
                                      <Comment className="profilesvg" style={{ padding: "20%" }} />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              ) : (
                                <TableCell
                                  align="center"
                                  // sx={{ width: "30% !important" }}
                                >
                                  <Tooltip title="Profile">
                                    <IconButton
                                      onClick={() => {
                                        props.setIsSelected(row.id);
                                        props.handleProfile(row);
                                      }}
                                      className={props.isSelected == row.id ? "selectedProfile" : "Profilicon"}
                                      sx={{
                                        marginRight: "2%",
                                        padding: "2% 1% 2% 1% ",
                                      }}
                                    >
                                      <Profile
                                        style={{ padding: "20%" }}
                                        className={props.isSelected == row.id ? "SelectedIcon" : "profilesvg"}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                  {props.user.role !== "Student" && (
                                    <Tooltip title="Booklet">
                                      <IconButton
                                        onClick={() => {
                                          props.setIsSelectedBook(row.id);
                                          props.handleComment(row);
                                        }}
                                        className={props.isSelectedBook == row.id ? "selectedProfile" : "Profilicon"}
                                        style={{
                                          marginRight: "2%",
                                          padding: "2% 4% 2% 4% ",
                                        }}
                                      >
                                        <Book
                                          className={props.isSelectedBook == row.id ? "SelectedIcon" : "profilesvg"}
                                          style={{ padding: "20%" }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                  <Tooltip title="Chat">
                                    <IconButton
                                      onClick={() => {
                                        props.setIsSelected(row.id);
                                        props.handleChat(row);
                                      }}
                                      className="Profilicon"
                                      sx={{
                                        padding: "1.5%",
                                      }}
                                    >
                                      <Comment className="profilesvg" style={{ padding: "20%" }} />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              )}
                            </>
                          );
                        })}
                      </TableRow>
                    );
                  })
              ) : (
                <TableHead>
                  <TableRow>
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
                    >
                      {t("No data found")}
                    </TableCell>
                  </TableRow>
                </TableHead>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* <Pagination
        count={10}
        color="secondary"
        shape="rounded"
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      /> */}
    </div>
  );
}
