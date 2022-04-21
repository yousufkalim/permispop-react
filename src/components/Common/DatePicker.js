import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import FormHelperText from "@mui/material/FormHelperText";
import frLocale from "date-fns/locale/fr";
import enLocale from "date-fns/locale/en-US";

const localeMap = {
  en: enLocale,
  fr: frLocale,
};

const maskMap = {
  fr: "__/__/____",
  en: "__/__/____",
};

export default function BasicDatePicker(props) {
  const [lng, setLng] = React.useState();
  const { i18n, t } = useTranslation();

  React.useEffect(() => {
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);

  const useStyles = makeStyles((theme) => ({
    TextField: {
      padding: props.padding,
      width: props.width,
    },

    helper: {},
  }));
  const classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[lng]}>
      <div>
        <DatePicker
          label={
            props.required ? (
              <div style={{ display: "flex" }}>
                {props.label}
                <div style={{ color: "red" }}>*</div>
              </div>
            ) : (
              props.label
            )
          }
          shrink={false}
          value={props.value}
          disabled={props.disabled === true ? true : false}
          maxDate={props.maxDate}
          minDate={props.minDate}
          shouldDisableDate={props.shouldDisableDate}
          shouldDisableYear={props.shouldDisableYear}
          onChange={props.onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.TextField}
              sx={{
                background: "#fff",
                borderRadius: "30px",
                fontStyle: "initial",
                boxShadow: "",
              }}
              error={props.error ? true : false}
              InputLabelProps={{ shrink: true }}
            >
              {props.error && (
                <FormHelperText
                  className={classes.helper}
                  {...props.helperProps}
                >
                  {props.ErrorMsg}
                </FormHelperText>
              )}
            </TextField>
          )}
          {...props.datePickerProps}
        />
      </div>
    </LocalizationProvider>
  );
}
