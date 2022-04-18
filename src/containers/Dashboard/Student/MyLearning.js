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
import Radio from "@mui/material/Radio";
import { color } from "@mui/system";
import { useTranslation } from "react-i18next";

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
  const [step, setStep] = React.useState(1);
  const [selectedValue, setSelectedValue] = React.useState("a");
  const { i18n , t } = useTranslation();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  return (
    <div style={{ padding: "0% 5% 5% 5%" }}>
      <Typography className="Mylearning_title"> {t("My Learning")}</Typography>
      <Divider
        width="100%"
        borderColor="#D5E4E8"
        margin="1% 0px 1% 0px !important"
      />
      <Grid container spacing={1} className="Mylearning_buttons">
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text={t("I - Practice")}
            color={step === 1 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor={step === 1 ? "#fff !important" : "#333"}
            borderRadius="30px !important"
            width="80% !important"
            onClick={(e) => setStep(1)}
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text={t("II - Apprehend")}
            color={step === 2 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor={step === 2 ? "#fff !important" : "#333"}
            borderRadius="30px !important"
            width="80% !important"
            onClick={(e) => setStep(2)}
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text={t("III - Driving")}
            color={step === 3 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor={step === 3 ? "#fff !important" : "#333"}
            borderRadius="30px !important"
            width="80% !important"
            onClick={(e) => setStep(3)}
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text={t("IV - Master")}
            color={step === 4 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            textColor={step === 4 ? "#fff !important" : "#333"}
            margin="0px 10px 0px 0px !important"
            borderRadius="30px !important"
            width="80% !important"
            onClick={(e) => setStep(4)}
          ></Button>
        </Grid>
        <Divider
          width="100%"
          borderColor="#D5E4E8"
          margin="1% 0px 1% 0px !important"
        />
      </Grid>
      {step === 1 ? (
        <>
          <Typography className="Mylearning_heading">
            {t("Practice the handling of the vehicle in light or no traffic")}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", width: "95%" }}
          >
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  {t("Accquired")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Wording")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Comments")}
                </th>
              </tr>
              <TableBody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td align="center">
                      <Radio
                        {...controlProps("a")}
                        defaultChecked
                        sx={{
                          color: pink[800],

                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                      <Radio
                        {...controlProps("b")}
                        defaultChecked
                        sx={{
                          color: "#FFA333",

                          "&.Mui-checked": {
                            color: "#FFA333",
                          },
                        }}
                      />
                      <Radio
                        {...controlProps("c")}
                        defaultChecked
                        sx={{
                          color: "#149E7A",

                          "&.Mui-checked": {
                            color: "#149E7A",
                          },
                        }}
                      />
                    </td>
                    <td align="center" className="MyProcedureWording">{row.wording}</td>
                    <td align="center">
                      <ForumIcon style={{ fill: "#149E7A" }}></ForumIcon>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : step === 2 ? (
        <>
          <Typography className="Mylearning_heading">
            {t("Apprehend the handling of the vehicle in light or no traffic")}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", width: "95%" }}
          >
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  {t("Accquired")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Wording")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Comments")}
                </th>
              </tr>
              <TableBody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td align="center">
                      <Radio
                        {...controlProps("a")}
                        defaultChecked
                        sx={{
                          color: pink[800],

                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                      <Radio
                        {...controlProps("b")}
                        defaultChecked
                        sx={{
                          color: "#FFA333",

                          "&.Mui-checked": {
                            color: "#FFA333",
                          },
                        }}
                      />
                      <Radio
                        {...controlProps("c")}
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
      ) : step === 3 ? (
        <>
          <Typography className="Mylearning_heading">
            {t("Drive the handling of the vehicle in light or no traffic")}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", width: "95%" }}
          >
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  {t("Accquired")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Wording")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Comments")}
                </th>
              </tr>
              <TableBody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td align="center">
                      <Radio
                        {...controlProps("a")}
                        defaultChecked
                        sx={{
                          color: pink[800],

                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                      <Radio
                        {...controlProps("b")}
                        defaultChecked
                        sx={{
                          color: "#FFA333",

                          "&.Mui-checked": {
                            color: "#FFA333",
                          },
                        }}
                      />
                      <Radio
                        {...controlProps("c")}
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
      ) : step === 4 ? (
        <>
          <Typography className="Mylearning_heading">
            {t("Master the handling of the vehicle in light or no traffic")}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", width: "95%" }}
          >
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  {t("Accquired")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Wording")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Comments")}
                </th>
              </tr>
              <TableBody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td align="center">
                      <Radio
                        {...controlProps("a")}
                        defaultChecked
                        sx={{
                          color: pink[800],

                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                      <Radio
                        {...controlProps("b")}
                        sx={{
                          color: "#FFA333",

                          "&.Mui-checked": {
                            color: "#FFA333",
                          },
                        }}
                      />
                      <Radio
                        {...controlProps("c")}
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
      ) : (
        ""
      )}
    </div>
  );
}

export default Mylearning;
