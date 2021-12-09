import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonComponent from "./Button";
import Pagination from "@mui/material/Pagination";
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid, Tab, Typography } from "@mui/material";
import MultipleSelectPlaceholder from "./SelectField";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import NativeSelectDemo from "./MobileFilters";

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
      <div className="Select">
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <Typography sx={{ m: 2 }}>Pending requests</Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <MultipleSelectPlaceholder label="All"></MultipleSelectPlaceholder>
          </Grid>
          <Grid item xs={6} md={2}>
            <MultipleSelectPlaceholder label="Filter by reciever"></MultipleSelectPlaceholder>
          </Grid>
        </Grid>
      </div>
      <div className="mobileSelect">
        <NativeSelectDemo></NativeSelectDemo>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {props.columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {props.data
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
                            column.id !== "actions" ? (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            ) : column.id == "actions" ? (
                              <TableCell align="right">
                                <p style={{ color: "#149E7A" }} align="center">
                                  Completed
                                </p>
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
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          spacing={2}
          sx={{
            m: 2,
          }}
        >
          <Grid item xs={6} md={9}>
            <Pagination count={10} color="secondary" shape="rounded" />
          </Grid>
          <Grid item xs={6} md={3}>
            <ButtonComponent
              variant="outlined"
              text="Create Request"
              startIcon={<AddIcon />}
            >
              Create Request
            </ButtonComponent>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
