import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "0.6px solid #D5D8DF",
  borderRadius: "27.5px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "16.4%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },

  ["@media (max-width:992px)"]: {
    // eslint-disable-line no-useless-computed-key
    display: "none",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "10%",
    width: "100%",
    height: "40px",
    color: "#9A9EA7",
    ["@media (max-width:1366px)"]: {
      // eslint-disable-line no-useless-computed-key
      height: "25px",
    },
  },
}));

export default function SearchAppBar() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: "#9296A2", width: "100%" }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
}
