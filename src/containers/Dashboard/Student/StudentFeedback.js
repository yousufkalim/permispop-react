import React from "react";
import BasicModal from "../../../components/Common/BasicModal";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Feedbackimg from "../../../assets/images/Feedbackmodal.svg";
import Rating from "../../../components/Common/Rating";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "../../../components/Common/Button";
import { useTranslation } from "react-i18next";
export default function FeedbackModal(props) {
  const { i18n , t } = useTranslation();
  //   const [feedback, setFeedback] = React.useState(true);

  return (
    <BasicModal
      open={props.open}
      onClose={props.onClose}
      closebtn={props.closebtn}
      modalTitle={props.modalTitle}
      //   modalboxclassName={
      //     register ? props.modalboxclassName : "Professional_modal"
      //   }
      modalTitleclassName={props.modalTitleclassName}
      {...props.modalProps}
    >
      <Grid className="Feedback">
        <img className="Feedbackimg" src={Feedbackimg} alt="" />
        <Typography className="RoleLabel">{t("Student")}</Typography>
        <Typography className="DateLabel">{t("Booking Date")}: 6/01/2022</Typography>
        <Rating
          size="large"
          //   readOnly={true}
          showLabel={true}
          precision="0.5"
          fontWeight="900"
          disabled={false}
          highlightSelectedOnly={false}
        ></Rating>
        <TextareaAutosize
          minRows={6}
          placeholder="Rating Reminder"
          className="TextArea"
        />
      </Grid>
      <Grid>
        <Grid className="Buttongrid">
          <Button
            text={t("Not Now")}
            variant="outlined"
            color="white"
            margin="0px 10px 0px 0px !important"
            textColor="#149e7a"
            borderRadius="5px !important"
            width="50% !important"
          ></Button>
          <Button
            text={t("Submit Rating")}
            color="#149E7A"
            margin="0px 10px 0px 0px !important"
            textColor="#fff"
            borderRadius="5px !important"
            width="50% !important"
          ></Button>
        </Grid>
      </Grid>
    </BasicModal>
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
