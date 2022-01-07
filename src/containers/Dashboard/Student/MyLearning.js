import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "../../../components/Common/Button";
import Divider from "../../../components/Common/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ForumIcon from "@mui/icons-material/Forum";
import TableContainer from "@mui/material/TableContainer";

import Paper from "@mui/material/Paper";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { width } from "@mui/system";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
function createData(wording, comments) {
  return { wording, comments };
}

const rows = [
  createData(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut "
  ),
  createData(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut "
  ),
  createData(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut "
  ),
  createData(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut "
  ),
  createData(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut "
  ),
];

function Mylearning() {
  return (
    <>
      <Typography className="Mylearning_title"> My Learning</Typography>
      <Divider
        width="100%"
        borderColor="#D5E4E8"
        margin="1% 0px 1% 0px !important"
      />
      <Grid container spacing={1} className="Mylearning_buttons">
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text="I - Master"
            color="#149E7A !important"
            margin="0px 10px 0px 0px !important"
            textColor="#fff"
            borderRadius="30px !important"
            width="80% !important"
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text="II - Apprehend"
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor=" #2B3135"
            borderRadius="30px !important"
            width="80% !important"
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text="III - Driving"
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor=" #2B3135"
            borderRadius="30px !important"
            width="80% !important"
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text="IV - Practice"
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor=" #2B3135"
            borderRadius="30px !important"
            width="80% !important"
          ></Button>
        </Grid>
        <Divider
          width="100%"
          borderColor="#D5E4E8"
          margin="1% 0px 1% 0px !important"
        />
      </Grid>
      <Typography className="Mylearning_heading">
        Master the handling of the vehicle in light or no traffic
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "20px", width: "95%" }}
      >
        <Table size="large" className="Learning_table">
          <tr className="Headingsdiv">
            <th className="Heading_data" align="center">
              Accquired
            </th>
            <th className="Heading_data" align="center">
              Wording
            </th>
            <th className="Heading_data" align="center">
              Comments
            </th>
          </tr>

          <TableBody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td align="center">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{
                      color: pink[800],

                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{
                      color: "#FFA333",

                      "&.Mui-checked": {
                        color: "#FFA333",
                      },
                    }}
                  />

                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{
                      color: "#149E7A",

                      "&.Mui-checked": {
                        color: "#149E7A",
                      },
                    }}
                  />
                </td>
                <td align="center">{row.wording}</td>
                <td align="center">
                  <ForumIcon style={{ fill: "#149E7A" }}></ForumIcon>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Mylearning;
