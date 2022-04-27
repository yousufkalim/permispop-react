import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "../../../components/Common/Button";
import Divider from "../../../components/Common/Divider";
import { rows, rows2, rows3, rows4 } from "../../../components/Common/Rows";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ForumIcon from "@mui/icons-material/Forum";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import API from "../../../api/index";
import moment from "moment";
import RadioButton from "../../../components/Common/RadioButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "80%",
  overflow: "scroll",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const user = JSON.parse(localStorage.getItem("user"));

function Mylearning() {
  const [comments, setComments] = useState([]);
  const [commentLevel, setCommentLevel] = useState([]);
  const [objomment, setObjComment] = useState([]);
  const [saveindx, setSaveindex] = useState();

  const [valueRadio, setValueRadio] = useState();
  const [valueRadioStudent, setValueRadioStudent] = useState();
  const [updateRadioValue, setupdateRadioValue] = useState();

  const [state, setstate] = useState();
  const [step, setStep] = useState(1);
  const [selectedValue, setSelectedValue] = useState("a");
  const [open, setOpen] = React.useState(false);

  const [checkingLevel, setCheckingLevel] = useState([]);
  const [checkingLevel2, setCheckingLevel2] = useState([]);
  const [checkingLevel3, setCheckingLevel3] = useState([]);
  const [checkingLevel4, setCheckingLevel4] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    BookletComments();
    let checklevel = Booklet();
    Promise.all([checklevel]).then((e) => {
      if (step === 1) {
        handleSetStep(e[0]);
      } else if (step === 2) {
        handleSetStep2(e[0]);
      } else if (step === 3) {
        handleSetStep3(e[0]);
      } else if (step === 4) {
        handleSetStep4(e[0]);
      }
    });
  }, [update, step]);

  const Booklet = async () => {
    return API("get", `Booklet/GetAllByStudentId/?id=${user.id}`).then(
      (GetAllBookletResponse) => {
        let array = GetAllBookletResponse?.data?.data?.map((e) => {
          return e.bookletItemId;
        });

        setCommentLevel(GetAllBookletResponse?.data?.data);
        return GetAllBookletResponse?.data?.data;
      }
    );
  };

  const HandleChangeRadio = async (e, obj, index) => {
    setSaveindex(index);
    const user = JSON.parse(localStorage.getItem("user"));
    setValueRadio(e.target.value);
    await API("post", `Booklet/UpdateBooklet`, {
      bookletItemId: obj?.bookletItemId || index,
      instructorId: obj?.instructorId,
      level: e.target.value,
      studentId: user.id,
      timeStamp: new Date(),
    }).then((UpdateBookletReponse) => {
      setupdateRadioValue(UpdateBookletReponse);
      setUpdate(!update);
    });
  };

  const BookletComments = async () => {
    await API(
      "get",
      `Booklet/GetAllBookletComments/?studentId=${user.id}&bookletItemId=all`
    ).then((GetAllBookletCommentsResponse) => {
      setComments(GetAllBookletCommentsResponse.data.data);
    });
  };

  const handleOpen = (index) => {
    setOpen(true);
    const IndexId = index;
    const FindCommentId = comments.filter(
      (p) => parseInt(p.bookletItemId) === IndexId
    );
    setObjComment(FindCommentId);
  };

  const handleClose = () => setOpen(false);
  // step 1
  const handleSetStep = (e) => {
    setStep(1);
    let level = {};
    let newRows = rows.map((row, index) => {
      level = e.find((p) => {
        if (parseInt(p.bookletItemId) === index + 1) {
          return p;
        }
      });

      return { row, level };
    });
    setCheckingLevel(newRows);
  };

  // step 2
  const handleSetStep2 = (e) => {
    setStep(2);
    let level = {};
    let newRows = rows2.map((row, index) => {
      level = e.find((p) => {
        if (parseInt(p.bookletItemId) === index + 10) {
          return p;
        }
      });

      return { row, level };
    });
    setCheckingLevel2(newRows);
  };

  // step 3
  const handleSetStep3 = (e) => {
    setStep(3);
    let level = {};
    let newRows = rows3.map((row, index) => {
      level = e.find((p) => {
        if (parseInt(p.bookletItemId) === index + 18) {
          return p;
        }
      });

      return { row, level };
    });
    setCheckingLevel3(newRows);
  };

  // step 4
  const handleSetStep4 = (e) => {
    setStep(4);
    let level = {};
    let newRows = rows4.map((row, index) => {
      level = e.find((p) => {
        if (parseInt(p.bookletItemId) === index + 25) {
          return p;
        }
      });

      return { row, level };
    });
    setCheckingLevel4(newRows);
  };
  return (
    <div style={{ padding: "0% 5% 5% 5%" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comments
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {objomment?.length ? (
              <div>
                {objomment.map((items, index) => {
                  return (
                    <div className="comment-box">
                      <div className="comment-box-inner">
                        {" "}
                        {items?.comments === "" ||
                        items?.comments === null ||
                        objomment?.length === 0 ? (
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
        </Box>
      </Modal>

      <Typography className="Mylearning_title">My Learning</Typography>
      <Divider
        width="100%"
        borderColor="#D5E4E8"
        margin="1% 0px 1% 0px !important"
      />
      <Grid container spacing={1} className="Mylearning_buttons">
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text="I - Master"
            color={step === 1 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            textColor={step === 1 ? "#fff !important" : "#333"}
            margin="0px 10px 0px 0px !important"
            borderRadius="30px !important"
            width="80% !important"
            onClick={(e) => handleSetStep()}
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text="II - Apprehend"
            color={step === 2 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor={step === 2 ? "#fff !important" : "#333"}
            borderRadius="30px !important"
            width="80% !important"
            onClick={(e) => handleSetStep2()}
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text="III - Driving"
            color={step === 3 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor={step === 3 ? "#fff !important" : "#333"}
            borderRadius="30px !important"
            width="80% !important"
            onClick={(e) => handleSetStep3()}
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text="IV - Practice "
            color={step === 4 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor={step === 4 ? "#fff !important" : "#333"}
            borderRadius="30px !important"
            width="80% !important"
            // onClick={(e) => setStep(4)}
            onClick={(e) => handleSetStep4()}
          ></Button>
        </Grid>
        <Divider
          width="100%"
          borderColor="#D5E4E8"
          margin="1% 0px 1% 0px !important"
        />
      </Grid>
      {step === 1 ? (
        <>
          <Typography className="Mylearning_heading">
            Practice the handling of the vehicle in light or no traffic
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", width: "95%" }}
          >
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  Accquired
                </th>
                <th className="Heading_data" align="center">
                  Wording
                </th>
                <th className="Heading_data" align="center">
                  Comments
                </th>
              </tr>

              <TableBody>
                {step === 1 ? (
                  <>
                    {checkingLevel.length > 0 &&
                      checkingLevel?.map((row, index) => {
                        return (
                          <tr key="">
                            <td align="center">
                              <RadioButton
                                checked1={
                                  row.level ? row?.level?.level === "1" : true
                                }
                                checked2={
                                  row.level ? row?.level?.level === "2" : false
                                }
                                checked3={
                                  row.level ? row?.level?.level === "3" : false
                                }
                                onChange1={(e) =>
                                  HandleChangeRadio(
                                    e,
                                    row?.level?.level,
                                    index + 1
                                  )
                                }
                                onChange2={(e) =>
                                  HandleChangeRadio(
                                    e,
                                    row?.level?.level,
                                    index + 1
                                  )
                                }
                                onChange3={(e) =>
                                  HandleChangeRadio(
                                    e,
                                    row?.level?.level,
                                    index + 1
                                  )
                                }
                              />
                            </td>
                            <td align="start" className="MyProcedureWording">
                              {index + 1}.{row?.row?.wording}
                            </td>
                            <td align="center">
                              <ForumIcon
                                onClick={() => handleOpen(index + 1)}
                                style={{ fill: "#149E7A" }}
                              ></ForumIcon>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : step === 2 ? (
        <>
          <Typography className="Mylearning_heading">
            Apprehend the handling of the vehicle in light or no traffic
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", width: "95%" }}
          >
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  Accquired
                </th>
                <th className="Heading_data" align="center">
                  Wording
                </th>
                <th className="Heading_data" align="center">
                  Comments
                </th>
              </tr>
              <TableBody>
                {step === 2 ? (
                  <>
                    {checkingLevel2.map((row, index) => {
                      return (
                        <tr key="">
                          <td align="center">
                            <RadioButton
                              checked1={
                                row.level ? row?.level?.level === "1" : true
                              }
                              checked2={
                                row.level ? row?.level?.level === "2" : false
                              }
                              checked3={
                                row.level ? row?.level?.level === "3" : false
                              }
                              onChange1={(e) =>
                                HandleChangeRadio(
                                  e,
                                  row?.level?.level,
                                  index + 10
                                )
                              }
                              onChange2={(e) =>
                                HandleChangeRadio(
                                  e,
                                  row?.level?.level,
                                  index + 10
                                )
                              }
                              onChange3={(e) =>
                                HandleChangeRadio(
                                  e,
                                  row?.level?.level,
                                  index + 10
                                )
                              }
                            />
                          </td>
                          <td align="start" className="MyProcedureWording">
                            {index + 10}.{row?.row?.wording}
                          </td>
                          <td align="center">
                            <ForumIcon
                              onClick={() => handleOpen(index + 10)}
                              style={{ fill: "#149E7A" }}
                            ></ForumIcon>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : step === 3 ? (
        <>
          <Typography className="Mylearning_heading">
            Drive the handling of the vehicle in light or no traffic
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", width: "95%" }}
          >
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  Accquired
                </th>
                <th className="Heading_data" align="center">
                  Wording
                </th>
                <th className="Heading_data" align="center">
                  Comments
                </th>
              </tr>
              <TableBody>
                {step === 3 ? (
                  <>
                    {checkingLevel3.map((row, index) => {
                      return (
                        <tr key="">
                          <td align="center">
                            <>
                              <RadioButton
                                checked1={
                                  row.level ? row?.level?.level === "1" : true
                                }
                                checked2={
                                  row.level ? row?.level?.level === "2" : false
                                }
                                checked3={
                                  row.level ? row?.level?.level === "3" : false
                                }
                                onChange1={(e) =>
                                  HandleChangeRadio(
                                    e,
                                    row?.level?.level,
                                    index + 18
                                  )
                                }
                                onChange2={(e) =>
                                  HandleChangeRadio(
                                    e,
                                    row?.level?.level,
                                    index + 18
                                  )
                                }
                                onChange3={(e) =>
                                  HandleChangeRadio(
                                    e,
                                    row?.level?.level,
                                    index + 18
                                  )
                                }
                              />
                            </>
                          </td>
                          <td align="start" className="MyProcedureWording">
                            {index + 18}.{row?.row?.wording}
                          </td>
                          <td align="center">
                            <ForumIcon
                              onClick={() => handleOpen(index + 18)}
                              style={{ fill: "#149E7A" }}
                            ></ForumIcon>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : step === 4 ? (
        <>
          <Typography className="Mylearning_heading">
            Master the handling of the vehicle in light or no traffic
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", width: "95%" }}
          >
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  Accquired
                </th>
                <th className="Heading_data" align="center">
                  Wording
                </th>
                <th className="Heading_data" align="center">
                  Comments
                </th>
              </tr>

              <TableBody>
                {step === 4 ? (
                  <>
                    {checkingLevel4.map((row, index) => {
                      return (
                        <tr key="">
                          <td align="center">
                            <>
                              <RadioButton
                                checked1={
                                  row.level ? row?.level?.level === "1" : true
                                }
                                checked2={
                                  row.level ? row?.level?.level === "2" : false
                                }
                                checked3={
                                  row.level ? row?.level?.level === "3" : false
                                }
                                onChange1={(e) =>
                                  HandleChangeRadio(
                                    e,
                                    row?.level?.level,
                                    index + 25
                                  )
                                }
                                onChange2={(e) =>
                                  HandleChangeRadio(
                                    e,
                                    row?.level?.level,
                                    index + 25
                                  )
                                }
                                onChange3={(e) =>
                                  HandleChangeRadio(
                                    e,
                                    row?.level?.level,
                                    index + 25
                                  )
                                }
                              />
                            </>
                          </td>
                          <td align="start" className="MyProcedureWording">
                            {index + 25}.{row.row.wording}
                          </td>
                          <td align="center">
                            <ForumIcon
                              onClick={() => handleOpen(index + 25)}
                              style={{ fill: "#149E7A" }}
                            ></ForumIcon>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Mylearning;
