import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectPlaceholder(props) {
  const theme = useTheme();
  let data = [];
  return (
    <div>
      <FormControl sx={{ m: 1, width: 170, height: 80 }}>
        <Select
          multiple
          displayEmpty
          onChange={props.onChange}
          value={props.value}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{props.label}</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {props.items ? (
            props.items.length > 0 ? (
              props.items.map((item) => {
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
/* Use of selectfield component
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
