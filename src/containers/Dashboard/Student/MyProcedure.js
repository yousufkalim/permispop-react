// import { TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Divider from "../../../components/Common/Divider";

import { useTranslation } from "react-i18next";
import API from "../../../api/index";
import LinkIcon from "@mui/icons-material/Link";

const Index = () => {
  const { i18n, t } = useTranslation();
  const [lng, setLng] = useState();
  const [proceduresData, setProceduresData] = useState([]);

  useEffect(() => {
    getProcedureData();
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);
  const getProcedureData = async () => {
    await API("get", "CMS/GetPageData?page=procedures")
      .then((getProcedureDataResponse) => {
        const procedures = getProcedureDataResponse.data.data;
        setProceduresData(procedures);
      })
      .catch((error) => console.log("error------->", error));
  };

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
      {/* <MobileViewFilters title={t("My Procedure")} /> */}
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
          {proceduresData.map((item) => {
            return (
              <>
                <div
                  className="ProceduresList"
                  onClick={() => window.open(`${item.textEnglish}`)}
                >
                  <Typography className="ProcedureGrid">
                    {lng === "en"
                      ? item?.headingEnglish
                      : lng === "fr"
                      ? item?.headingFrench
                      : ""}
                  </Typography>
                  <LinkIcon fontSize="large" />
                </div>
                <Divider margin="none" />
              </>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
