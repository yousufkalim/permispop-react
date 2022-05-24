import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import moment from "moment";
import SendVector from "../../assets/images/SendVector.png";
import Fab from "@mui/material/Fab";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "80%",
  overflowX: "scroll",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CommentsModal = (props) => {
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comments
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, overflowY: "scroll", height: "80%" }}
          >
            {props.objomment?.length ? (
              <div>
                {props.objomment.map((items, index) => {
                  return (
                    <div className="comment-box">
                      <div className="comment-box-inner">
                        {" "}
                        {items?.comments === "" ||
                        items?.comments === null ||
                        props.objomment?.length === 0 ? (
                          <h5 style={{ color: "red" }}>Comment is Empty</h5>
                        ) : (
                          <p>
                            <h4>{items?.instructorName}</h4> <br></br>{" "}
                            {items?.comments}{" "}
                          </p>
                        )}
                      </div>
                      <div className="triangle-comment"></div>
                      <p className="comment-date">
                        {moment(items?.timeStamp).format("DD/MM/YYYY HH:mm")}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <h1 style={{ color: "gray" }}>Not Found</h1>
            )}
          </Typography>

          <div className="CommentDiv">
            <div className="MessageText">
              <input
                placeholder="Type a Comment here to Add"
                className="ChatBoxTypingField"
                value={props.message}
                onChange={(e) => {
                  props.setMessage(e.target.value);
                }}
                onKeyPress={props.handleKeypress}
              />
            </div>
            <div className="MessageRight" onClick={props.onClick}>
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                sx={{ margin: "10px" }}
              >
                <img src={SendVector} />
              </Fab>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CommentsModal;
