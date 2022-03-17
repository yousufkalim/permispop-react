import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";

export default function DropDown(props) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      width: props.formWidth || "100%",
      "@media (max-width:600px)": {
        width: "100% ",
      },
    },
    inputLabels: {
      fontFamily: "Inter",
      fontStyle: "normal ",
      fontWeight: "400 ",
      fontSize: "24px ",
      lineHeight: "200.02% ",
      color: "#363557 !important",
      "&  .MuiInputLabel-formControl": { textAlign: "center !important" },

      "@media (max-width:992px)": {
        fontSize: "20px",
      },
      "@media (max-width:600px)": {
        width: "200%",
        textAlign: "center",
      },
    },
    input: {
      height: "70px ",
      borderBottom: "none ",
      fontFamily: "Inter ",
      fontStyle: "normal ",
      fontSize: "18px",
      lineHeight: "151.02%",
      color: "#B9B7CC",
      fontWeight: "300 ",

      "@media (max-width:992px)": {
        fontSize: "16px",
      },
      "@media (max-width:600px)": {
        height: "60px",
        "& .MuiInput-input": {
          textAlign: "center",
        },
      },
    },
    helper: {},
  }));
  const classes = useStyles();

  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        className={classes.formControl}
        error={props.error ? true : false}
        variant={props.variant || "standard"}
        {...props.FormControlProps}
      >
        <InputLabel
          id="demo-simple-select-standard-label"
          shrink={true}
          className={[classes.inputLabels, props.inputLabelStyle].join(" ")}
          {...props.inputLabelProps}
        >
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={props.onChange}
          value={props.value}
          // renderValue={(value) => (props.value ? props.value : "France")}
        >
          {props.MenuItem ? (
            props.MenuItem.length > 0 ? (
              props.MenuItem.map((item) => {
                return <MenuItem value={item.value}>{item.name}</MenuItem>;
              })
            ) : (
              <MenuItem value={0} disabled={true}>
                No value found
              </MenuItem>
            )
          ) : (
            <MenuItem value={0} disabled={true}>
              No value found
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
