import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as Modalclosebtn } from "../../assets/images/modalclosebtn.svg";

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        className={[props.modalclassName, "roots"].join(" ")}
        {...props.modalProps}
      >
        <>
          <Box
            className={[props.modalboxclassName, "box"].join(" ")}
            {...props.modalboxProps}
          >
            {props.closebtn ? (
              <IconButton
                className={props.closebtnclassName || "close"}
                color="inherit"
                edge="start"
                aria-expanded={props.open ? "true" : undefined}
                onClick={props.onClose}
                {...props.closebtnProps}
              >
                <Modalclosebtn style={{ width: "22px" }} />
              </IconButton>
            ) : null}

            {props.modalTitle ? (
              <Typography
                className={props.modalTitleclassName || "title"}
                variant={props.variant || "h6"}
                {...props.modalTitleProps}
              >
                {props.modalTitle}
              </Typography>
            ) : null}

            {props.children}
          </Box>
        </>
      </Modal>
    </div>
  );
}

/* 
    <BasicModal 
      modalBtn="Login"                          // To name the modal button
      modalBtnProps={{}}                        // to pass any built-in props for Modal Button 
      modalclassName                            // to use any customized css class for Modal
      modalProps={{}}                           // to pass any built-in props for Modal
      modalboxclassName=""                      // to use any customized css class for Modal box
      modalboxProps={{}}                        // to pass any built-in props for Modal Box
      closebtn                                  // to use the close button
      closebtnclassName                         // to use any customized css class for close button
      closebtnProps={{}}                        // to pass any built-in props for close Button
      modalTitle="Login to your account"        // to enter the title text
      modalTitleclassName='login_modal_title'   // to use any customized css class for title
      modalTitleProps={{align:"left"}}          // to pass any built-in props for title Typography
    





*/
