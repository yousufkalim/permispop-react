import React from "react";
import Radio from "@mui/material/Radio";
import { pink } from "@mui/material/colors";

const RadioButton = (props) => {
  return (
    <>
      <Radio
        checked={props.checked1}
        value="1"
        name="radio-buttons"
        onChange={props.onChange1}
        sx={{
          color: pink[800],

          "&.Mui-checked": {
            color: pink[600],
          },
        }}
      />
      <Radio
        checked={props.checked2}
        value="2"
        name="radio-buttons"
        onChange={props.onChange2}
        sx={{
          color: "#FFA333",

          "&.Mui-checked": {
            color: "#FFA333",
          },
        }}
      />
      <Radio
        checked={props.checked3}
        value="3"
        name="radio-buttons"
        onChange={props.onChange3}
        sx={{
          color: "#149E7A",
          "&.Mui-checked": {
            color: "#149E7A",
          },
        }}
      />
    </>
  );
};

export default RadioButton;
