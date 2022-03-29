// import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import Chip from "@mui/material/Chip";
// import { makeStyles } from "@mui/styles";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";

// import Downshift from "downshift";

// const useStyles = makeStyles((theme) => ({
//   chip: {
//     margin: theme.spacing(0.5, 0.25),
//   },

//   input: {
//     height: "70px !important",
//     borderBottom: "none !important",
//     fontFamily: "Inter !important",
//     fontStyle: "normal !important",
//     fontSize: "18px !important",
//     lineHeight: "151.02% !important",
//     color: "black !important",
//     fontWeight: "300 !important",

//     "@media (max-width:992px)": {
//       fontSize: "16px !important",
//     },
//     "@media (max-width:600px)": {
//       height: "60px !important",
//       "& .MuiInput-input": {
//         textAlign: "center !important",
//       },
//     },
//   },
//   inputLabels: {
//     fontFamily: "Inter !important",
//     fontStyle: "normal !important",
//     fontWeight: "550 !important",
//     fontSize: "50px !important",
//     lineHeight: "151.02 !important%",
//     color: "#363557 !important",
//     "&  .MuiInputLabel-formControl": { textAlign: "center !important" },

//     "@media (max-width:992px)": {
//       fontSize: "20px !important",
//     },
//     "@media (max-width:600px)": {
//       width: "200% !important",
//       textAlign: "center !important",
//     },
//   },
// }));

// export default function MultiSelect({ ...props }) {
//   const classes = useStyles();
//   const { selectedTags, placeholder, tags, ...other } = props;
//   const [inputValue, setInputValue] = React.useState("");
//   const [selectedItem, setSelectedItem] = React.useState([]);
//   useEffect(() => {
//     setSelectedItem(tags);
//   }, [tags]);
//   useEffect(() => {
//     selectedTags(selectedItem);
//   }, [selectedItem, selectedTags]);

//   function handleKeyDown(event) {
//     if (event.key === "Enter") {
//       const newSelectedItem = [...selectedItem];
//       const duplicatedValues = newSelectedItem.indexOf(
//         event.target.value.trim()
//       );

//       if (duplicatedValues !== -1) {
//         setInputValue("");
//         return;
//       }
//       if (!event.target.value.replace(/\s/g, "").length) return;

//       newSelectedItem.push(event.target.value.trim());
//       setSelectedItem(newSelectedItem);
//       setInputValue("");
//     }
//     if (
//       selectedItem.length &&
//       !inputValue.length &&
//       event.key === "Backspace"
//     ) {
//       setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
//     }
//   }
//   function handleChange(item) {
//     let newSelectedItem = [...selectedItem];
//     if (newSelectedItem.indexOf(item) === -1) {
//       newSelectedItem = [...newSelectedItem, item];
//     }
//     setInputValue("");
//     setSelectedItem(newSelectedItem);
//   }

//   const handleDelete = (item) => () => {
//     const newSelectedItem = [...selectedItem];
//     newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
//     setSelectedItem(newSelectedItem);
//   };

//   function handleInputChange(event) {
//     setInputValue(event.target.value);
//   }
//   return (
//     <React.Fragment>
//       <Downshift
//         id="downshift-multiple"
//         inputValue={inputValue}
//         onChange={handleChange}
//         selectedItem={selectedItem}
//       >
//         {({ getInputProps }) => {
//           const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
//             onKeyDown: handleKeyDown,
//           });
//           return (
//             <div>
//               <InputLabel
//                 sx={{
//                   fontSize: "24px",
//                   fontStyle: "normal !important",
//                   fontWeight: "550 !important",
//                   color: "#363557 !important",
//                 }}
//                 shrink={true}
//               >
//                 {props.text}
//               </InputLabel>
//               <TextField
//                 sx={{ width: "100% !important", paddingTop: "20px" }}
//                 placeholder="Spoken languages"
//                 InputProps={{
//                   startAdornment: selectedItem.map((item) => (
//                     <Chip
//                       key={item}
//                       tabIndex={-1}
//                       label={item}
//                       className={classes.chip}
//                       onDelete={handleDelete(item)}
//                     />
//                   )),
//                   onBlur,
//                   onChange: (event) => {
//                     handleInputChange(event);
//                     onChange(event);
//                   },
//                   onFocus,
//                 }}
//                 {...other}
//                 {...inputProps}
//                 className={classes.input}
//               />
//             </div>
//           );
//         }}
//       </Downshift>
//     </React.Fragment>
//   );
// }
// MultiSelect.defaultProps = {
//   tags: [],
// };
// MultiSelect.propTypes = {
//   selectedTags: PropTypes.func.isRequired,
//   tags: PropTypes.arrayOf(PropTypes.string),
// };
// {
//   /* <MultiSelect
//   selectedTags={handleSelecetedTags}
//   fullWidth
//   variant="outlined"
//   id="tags"
//   name="tags"
//   placeholder="add Tags"
//   label="tags"
// />; */
// }
