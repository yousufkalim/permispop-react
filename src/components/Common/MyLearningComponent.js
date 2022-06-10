import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "./Button";
import Divider from "./Divider";
import { rows, rows2, rows3, rows4 } from "./Rows";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ForumIcon from "@mui/icons-material/Forum";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import API from "../../api/index";
import moment from "moment";
import RadioButton from "./RadioButton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Fab from "@mui/material/Fab";
import SendVector from "../../assets/images/SendVector.png";
import { useTranslation } from "react-i18next";

import { x } from "joi";
import { toast } from "react-toastify";
import CommentsModal from "./CommentsModal";

const user = JSON.parse(localStorage.getItem("user"));

function MyLearningComponent(props) {
  const { i18n, t } = useTranslation();

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
  const [message, setMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");

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
    return API("get", `Booklet/GetAllByStudentId/?id=${props.commentsData.id}`).then((GetAllBookletResponse) => {
      let array = GetAllBookletResponse?.data?.data?.map((e) => {
        return e.bookletItemId;
      });

      setCommentLevel(GetAllBookletResponse?.data?.data);
      return GetAllBookletResponse?.data?.data;
    });
  };

  const HandleChangeRadio = async (e, obj, index) => {
    setSaveindex(index);
    setValueRadio(e.target.value);
    await API("post", `Booklet/UpdateBooklet`, {
      bookletItemId: obj?.bookletItemId || index,
      instructorId: user.id,
      level: e.target.value,
      studentId: props.commentsData.id,
      timeStamp: new Date(),
    }).then((UpdateBookletReponse) => {
      setupdateRadioValue(UpdateBookletReponse);
      setUpdate(!update);
    });
  };
  const BookletComments = async () => {
    await API("get", `Booklet/GetAllBookletComments/?studentId=${props.commentsData.id}&bookletItemId=all`).then(
      (GetAllBookletCommentsResponse) => {
        setComments(GetAllBookletCommentsResponse.data.data);
      }
    );
  };
  const AddComments = async () => {
    await API("post", `Booklet/UpdateBookletComments`, {
      bookletItemId: currentIndex,
      comments: message,
      instructorId: user.id,
      instructorName: `${user.firstName}${user.surName}`,
      studentId: props.commentsData.id,
      timeStamp: new Date(),
    }).then((UpdateBookletCommentsResponce) => {});
  };

  const handleOpen = (index) => {
    setCurrentIndex(index);
    BookletComments();
    const IndexId = index;
    const FindCommentId = comments.filter((p) => parseInt(p.bookletItemId) === IndexId);
    setObjComment(FindCommentId);
    setOpen(true);
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
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  const onClick = () => {
    setOpen(false);
    AddComments(currentIndex, message);
    setMessage("");
    toast.success(t("Comment added successfully"));
  };
  return (
    <div style={{ padding: "0% 5% 5% 5%" }}>
      <CommentsModal
        objomment={objomment}
        message={message}
        setMessage={setMessage}
        handleKeypress={handleKeypress}
        handleClose={handleClose}
        onClick={onClick}
        open={open}
      />

      <Typography className="Mylearning_title">{t("My Learning")}</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="1% 0px 1% 0px !important" />
      <Grid container spacing={1} className="Mylearning_buttons">
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text={t("I - Master")}
            color={step === 1 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            textColor={step === 1 ? "#fff !important" : "#333"}
            margin="0px 10px 0px 0px !important"
            borderRadius="30px !important"
            width="80% !important"
            onClick={(e) => handleSetStep(e)}
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text={t("II - Apprehend")}
            color={step === 2 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor={step === 2 ? "#fff !important" : "#333"}
            borderRadius="30px !important"
            width="80% !important"
            onClick={(e) => handleSetStep2(e)}
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text={t("III - Driving")}
            color={step === 3 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor={step === 3 ? "#fff !important" : "#333"}
            borderRadius="30px !important"
            width="80% !important"
            onClick={(e) => handleSetStep3(e)}
          ></Button>
        </Grid>
        <Grid sx={6} sm={6} md={3} className="Buttonsec">
          <Button
            text={t("IV - Practice")}
            color={step === 4 ? "#149E7A !important" : "white !important"}
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            textColor={step === 4 ? "#fff !important" : "#333"}
            borderRadius="30px !important"
            width="80% !important"
            // onClick={(e) => setStep(4)}
            onClick={(e) => handleSetStep4(e)}
          ></Button>
        </Grid>
        <Divider width="100%" borderColor="#D5E4E8" margin="1% 0px 1% 0px !important" />
      </Grid>
      {step === 1 ? (
        <>
          <Typography className="MylearningComponent_heading">
            {t("Practice the handling of the vehicle in light or no traffic")}
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: "20px", width: "95%" }}>
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  {t("Accquired")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Wording")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Add Comments")}
                </th>
              </tr>

              <TableBody>
                {step === 1 ? (
                  <>
                    {checkingLevel.length > 0 &&
                      checkingLevel?.map((row, index) => {
                        return (
                          <tr key="">
                            <td align="center" style={{ display: "flex" }}>
                              <RadioButton
                                checked1={row.level ? row?.level?.level === "1" : true}
                                checked2={row.level ? row?.level?.level === "2" : false}
                                checked3={row.level ? row?.level?.level === "3" : false}
                                onChange1={(e) => HandleChangeRadio(e, row?.level?.level, index + 1)}
                                onChange2={(e) => HandleChangeRadio(e, row?.level?.level, index + 1)}
                                onChange3={(e) => HandleChangeRadio(e, row?.level?.level, index + 1)}
                              />
                            </td>
                            <td align="start" className="My_Learning_Component_Wording">
                              {index + 1}.{row?.row?.wording}
                            </td>
                            <td align="center">
                              <ForumIcon
                                onClick={() => handleOpen(index + 1)}
                                style={{
                                  fill: "#149E7A",
                                  marginLeft: 8,
                                  cursor: "pointer",
                                }}
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
          <Typography className="MylearningComponent_heading">
            {t("Apprehend the handling of the vehicle in light or no traffic")}
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: "20px", width: "95%" }}>
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  {t("Accquired")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Wording")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Add Comments")}
                </th>
              </tr>
              <TableBody>
                {step === 2 ? (
                  <>
                    {checkingLevel2.map((row, index) => {
                      return (
                        <tr key="">
                          <td align="center" style={{ display: "flex" }}>
                            <RadioButton
                              checked1={row.level ? row?.level?.level === "1" : true}
                              checked2={row.level ? row?.level?.level === "2" : false}
                              checked3={row.level ? row?.level?.level === "3" : false}
                              onChange1={(e) => HandleChangeRadio(e, row?.level?.level, index + 10)}
                              onChange2={(e) => HandleChangeRadio(e, row?.level?.level, index + 10)}
                              onChange3={(e) => HandleChangeRadio(e, row?.level?.level, index + 10)}
                            />
                          </td>
                          <td align="start" className="My_Learning_Component_Wording">
                            {index + 10}.{row?.row?.wording}
                          </td>
                          <td align="center">
                            <td align="center">
                              <ForumIcon
                                onClick={() => handleOpen(index + 1)}
                                style={{ fill: "#149E7A", marginLeft: 8 }}
                              ></ForumIcon>
                            </td>
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
          <Typography className="MylearningComponent_heading">
            {t("Drive the handling of the vehicle in light or no traffic")}
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: "20px", width: "95%" }}>
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  {t("Accquired")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Wording")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Add Comments")}
                </th>
              </tr>
              <TableBody>
                {step === 3 ? (
                  <>
                    {checkingLevel3.map((row, index) => {
                      return (
                        <tr key="">
                          <td align="center" style={{ display: "flex" }}>
                            <>
                              <RadioButton
                                checked1={row.level ? row?.level?.level === "1" : true}
                                checked2={row.level ? row?.level?.level === "2" : false}
                                checked3={row.level ? row?.level?.level === "3" : false}
                                onChange1={(e) => HandleChangeRadio(e, row?.level?.level, index + 18)}
                                onChange2={(e) => HandleChangeRadio(e, row?.level?.level, index + 18)}
                                onChange3={(e) => HandleChangeRadio(e, row?.level?.level, index + 18)}
                              />
                            </>
                          </td>
                          <td align="start" className="My_Learning_Component_Wording">
                            {index + 18}.{row?.row?.wording}
                          </td>
                          <td align="center">
                            <td align="center">
                              <ForumIcon
                                onClick={() => handleOpen(index + 1)}
                                style={{ fill: "#149E7A", marginLeft: 8 }}
                              ></ForumIcon>
                            </td>
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
          <Typography className="MylearningComponent_heading">
            {t("Master the handling of the vehicle in light or no traffic")}
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: "20px", width: "95%" }}>
            <Table size="large" className="Learning_table">
              <tr className="Headingsdiv">
                <th className="Heading_data" align="center">
                  {t("Accquired")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Wording")}
                </th>
                <th className="Heading_data" align="center">
                  {t("Add Comments")}
                </th>
              </tr>

              <TableBody>
                {step === 4 ? (
                  <>
                    {checkingLevel4.map((row, index) => {
                      return (
                        <tr key="">
                          <td align="center" style={{ display: "flex" }}>
                            <>
                              <RadioButton
                                checked1={row.level ? row?.level?.level === "1" : true}
                                checked2={row.level ? row?.level?.level === "2" : false}
                                checked3={row.level ? row?.level?.level === "3" : false}
                                onChange1={(e) => HandleChangeRadio(e, row?.level?.level, index + 25)}
                                onChange2={(e) => HandleChangeRadio(e, row?.level?.level, index + 25)}
                                onChange3={(e) => HandleChangeRadio(e, row?.level?.level, index + 25)}
                              />
                            </>
                          </td>
                          <td align="start" className="My_Learning_Component_Wording">
                            {index + 25}.{row.row.wording}
                          </td>
                          <td align="center">
                            <td align="center">
                              <ForumIcon
                                onClick={() => handleOpen(index + 1)}
                                style={{ fill: "#149E7A", marginLeft: 8 }}
                              ></ForumIcon>
                            </td>
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

export default MyLearningComponent;
