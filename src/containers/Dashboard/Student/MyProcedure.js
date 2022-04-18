// import { TableRow } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";
import DatePicker from "../../../components/Common/DatePicker";
import MobileViewFilters from "../../../components/Common/MobileViewFilters";
import Divider from "../../../components/Common/Divider";
import ButtonComponent from "../../../components/Common/Button";
import { useTranslation } from "react-i18next";


const Index = () => {
  const { i18n , t } = useTranslation();
  const [Startvalue, setStartValue] = useState(new Date());
  const handleStartdate = (newValue) => {
    setStartValue(newValue);
  };

  const [Endvalue, setEndValue] = useState(new Date());
  const handleEnddate = (newValue) => {
    setEndValue(newValue);
  };
  return (
    <>
      <MobileViewFilters title={t("My Procedure")} />
      <div className="Filters">
        <Grid container spacing={1} sx={{ marginTop: "30px" }}>
          <Grid xs={12} sm={12} md={4}>
            <Typography
              className="MyProcedureHeading"
              sx={{
                marginTop: "20px",
                paddingLeft: "80px",
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 500,
                fontSize: "28px",
                lineHight: "34px",
                /* identical to box height */

                color: "#2A3235",
              }}
            >
              {t("My Procedure")}
            </Typography>
          </Grid>
        </Grid>
      </div>

      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />

      <Grid container spacing={1} sx={{ margin: "30px" }}>
        <Grid xs={12}>
          <div className="ProceduresList">
            <Typography className="ProcedureGrid">{t("ANTS")}</Typography>
          </div>
          <Divider />
          <div className="ProceduresList">
            <Typography className="ProcedureGrid">
              {t("My simplified procedures")}
            </Typography>
          </div>
          <Divider />
          <div className="ProceduresList">
            <Typography className="ProcedureGrid">
              {t("Book a code date")}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
