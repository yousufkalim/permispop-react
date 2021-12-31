import * as React from "react";
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

export default function DataTable(props) {
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
                    .map((row) => {
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
                                    <p
                                      style={{
                                        color: "#149E7A",
                                        background: "#E8FEED",
                                        paddingTop: "15px",
                                        paddingBottom: "15px",
                                        borderRadius: "12px",
                                      }}
                                      align="center"
                                    >
                                      Completed
                                    </p>
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
                                    ></Button>
                                    <Button
                                      type="submit"
                                      text="Details"
                                      color="#149E7A !important"
                                      width="60% !important"
                                      margin="0px 0px 10px 0px !important"
                                      height="50px !important"
                                    ></Button>
                                    <Button
                                      type="submit"
                                      text="Add Meetup Point"
                                      color="#149E7A !important"
                                      width="60% !important"
                                      height="50px !important"
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
                                    ></Button>
                                    <Button
                                      type="submit"
                                      text="Delete"
                                      color="#149E7A !important"
                                      width="100% !important"
                                      margin="0px 0px 10px 0px !important"
                                      height="50px !important"
                                    ></Button>
                                  </TableCell>
                                ) : (
                                  <TableCell align="center">
                                    <MoreVertIcon />
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
    </div>
  );
}
