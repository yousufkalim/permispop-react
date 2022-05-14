import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

export default function DropDown(props) {
  const { i18n, t } = useTranslation();

  // const useStyles = makeStyles((theme) => ({
  //   formControl: {
  //     width: props.formWidth || "100% !important",
  //     "@media (max-width:600px)": {
  //       width: "100% ",
  //     },
  //   },
  //   inputLabels: {
  //     fontFamily: "Inter",
  //     fontStyle: "normal ",
  //     fontWeight: "400 ",
  //     fontSize: "24px ",
  //     lineHeight: "200.02% ",
  //     color: "#363557 !important",
  //     "&  .MuiInputLabel-formControl": { textAlign: "center !important" },

  //     "@media (max-width:992px)": {
  //       fontSize: "20px",
  //     },
  //     "@media (max-width:600px)": {
  //       width: "200%",
  //       textAlign: "center",
  //     },
  //   },
  //   input: {
  //     height: "70px ",
  //     borderBottom: "none ",
  //     fontFamily: "Inter ",
  //     fontStyle: "normal ",
  //     fontSize: "18px",
  //     lineHeight: "151.02%",
  //     color: "#B9B7CC",
  //     fontWeight: "300 ",

  //     "@media (max-width:992px)": {
  //       fontSize: "16px",
  //     },
  //     "@media (max-width:600px)": {
  //       height: "60px",
  //       "& .MuiInput-input": {
  //         textAlign: "center",
  //       },
  //     },
  //   },
  //   helper: {},
  // }));
  // const classes = useStyles();

  return (
    <div>
      <FormControl
        sx={{
          minWidth: 120,
          paddingTop: "1px !important",
          minHeight: "50px !important",
        }}
        className="formControl"
        error={props.error ? true : false}
        variant={props.variant || "standard"}
        {...props.FormControlProps}
      >
        <InputLabel
          id="demo-simple-select-standard-label"
          sx={{
            fontSize: "24px",
            fontStyle: "normal !important",
            fontWeight: "550 !important",
            color: "#363557 !important",
          }}
          shrink={true}
          className={["inputLabelsDD", props.inputLabelStyle].join(" ")}
          {...props.inputLabelProps}
        >
          {props.label}
          {props.required ? <div style={{ color: "red" }}> *</div> : ""}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={props.onChange}
          value={props.value}
          defaultValue={0}

          // renderValue={(value) => (props.value ? props.value : "France")}
        >
          {props.MenuItem ? (
            props.MenuItem.length > 0 ? (
              props.MenuItem.map((item) => {
                return (
                  <MenuItem
                    value={item.value}
                    sx={{ height: "50% !important" }}
                  >
                    {item.name}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value={0} disabled={true}>
                {t("No value found")}
              </MenuItem>
            )
          ) : (
            <MenuItem value={0} disabled={true}>
              {t("No value found")}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}

/* Using dropdown component
<DropDown
label="gender"  //Label of the field
value={age}    //Selected value
onChange={handleChange}
MenuItem={[
{ name: "name", value: "value" },
{ name: "name", value: "value" },
{ name: "name", value: "value" },
]} //items to be shown in dropdown
> 
</DropDown>




*/
