import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 80,
    },
  },
};

export default function MultipleSelectPlaceholder(props) {
  return (
    <div>
      <FormControl sx={{ m: 1, width: "85% !Important" }}>
        <Select
          sx={{
            // width: "200px !important",
            borderRadius: "100px !important",
            // boxShadow: "0px 14px 29px rgb(100 30 0 / 10%)",
            background: "#fff",
          }}
          multiple
          displayEmpty
          onChange={props.onChange}
          value={props.value || []}
          // input={<OutlinedInput />}
          renderValue={(value) => (value.length > 0 ? value : "Enter value")}
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
{
  /* <DropDown
  label="gender"  //Label of the field
  value={[]}    //Selected value
  onChange={handleChange}
  MenuItem={[
  { name: "name", value: "value" },
  { name: "name", value: "value" },
  { name: "name", value: "value" },
  ]} //items to be shown in dropdown
> 
</DropDown> */
}
