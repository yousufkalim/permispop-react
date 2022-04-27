import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import MyLearningComponent from "./MyLearningComponent";

const AddCommentModel = () => {
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    bgcolor: "background.paper",
    boxShadow: 20,
    borderRadius: "10px",
    p: 3,
  };
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const { i18n, t } = useTranslation();

  return (
    <>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={true}
        onClose={() => setOpenCommentsModal(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style2}>
          {/* <Typography
            sx={{
              color: "#110000",
              marginBottom: "3px",
              marginTop: "5%",
              fontWeight: "550",
            }}
          >
            {t("Add Comments")}
          </Typography> */}
          <MyLearningComponent />
        </Box>
      </Modal>
    </>
  );
};

export default AddCommentModel;
