import React, { useState, useEffect } from "react";
import DataTable from "../../../components/Common/Table";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";
import { Instructorcolumns } from "../../../utils/tableHeads";
import { Instructorrows } from "../../../utils/tablerows";
import DatePicker from "../../../components/Common/DatePicker";
import MobileViewFilters from "../../../components/Common/MobileViewFilters";
import Divider from "../../../components/Common/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Backdrop from "@mui/material/Backdrop";
import Button from "../../../components/Common/Button";
import AutoComplete from "../../../components/Common/Autocomplete";
import axios from "axios";
import Joi from "joi-browser";
import TextField from "../../../components/Common/TextField";
import { toast } from "react-toastify";
import moment from "moment";
import DropDown from "../../../components/Common/DropDown";
import FilePicker from "../../../components/Common/FilePicker";
import { useTranslation } from "react-i18next";
import API from "../../../api";
import {
  Typography,
  Grid,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Loader from "../../../components/Common/FullScreenLoader";

const Index = () => {
  const { i18n, t } = useTranslation();
  // const [Startvalue, setStartValue] = useState(new Date());
  // const handleStartdate = (newValue) => {
  //   setStartValue(newValue);
  // };

  // const [Endvalue, setEndValue] = useState(new Date());
  // const handleEnddate = (newValue) => {
  //   setEndValue(newValue);
  // };
  const style_ = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    overflowX: "scroll",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 6,
    mt: 3,
    borderRadius: "4px",
    overflowX: "hidden",
  };

  const [instructorData, setInstructorData] = useState([]);
  const [addInstructor, setAddInstructor] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [updatefield, SetUpdateField] = useState("");
  const [openMeetupModal, setOPenMeetupModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [update, setUpdate] = useState(false);

  const [studentErrors, setStudentErrors] = useState({});
  const [addresses, setAddresses] = React.useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = React.useState({
    zip: "",
    label: "",
    city: "",
    lat: "",
    lng: "",
  });

  const [instructorDetail, setInstructorDetail] = useState({
    Firstname: "",
    Surname: "",
    Dob: new Date(),
    Pob: "",
    Gender: "",
    Address: {
      Label: "",
      Zip: "",
      City: "",
      Lat: "",
      Lng: "",
    },
    Complement: "",
    Email: "",
    Email2: "",
    Phone: "",
    Phone2: "",
    Password: "",
    ConfirmPassword: "",
    ProfileImg: "",
    DriverLicenseNumber: "",
    DriverLicenseStartDate: new Date(),
    DriverLicenseEndDate: new Date(),
    DriverLicenseFrontImg: "",
    DriverLicenseBackImg: "",
    ExcAuthNumber: "",
    ExcAuthIssueAuth: "",
    ExcAuthStartDate: new Date(),
    ExcAuthEndDate: new Date(),
    ExcAuthFrontImg: "",
    ExcAuthBackImg: "",
    TypeContract: "",
  });
  const [step6Errors, setStep6Errors] = React.useState({});

  const step6Schema = {
    Firstname: Joi.string()
      .min(3)
      .required()
      .label("Firstname")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Surname: Joi.string()
      .min(3)
      .required()
      .label("Surname")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Dob: Joi.string()
      .required()
      .label("Dob")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Pob: Joi.string()
      .required()
      .label("Pob")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Gender: Joi.string()
      .required()
      .label("Gender")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Address: Joi.string()
      .required()
      .label("Address")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Complement: Joi.string()
      .label("Complement")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Email: Joi.string()
      .email()
      .required()
      .label("Email")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Email2: Joi.string()
      .label("Email2")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Phone: Joi.string()
      .required()
      .label("Phone")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Phone2: Joi.string()
      .label("Phone2")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Password: Joi.string()
      .min(8)
      .required()
      .label("Password")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    ConfirmPassword: Joi.string()
      .label("ConfirmPassword")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    ProfileImg: Joi.string()
      .label("ProfileImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    DriverLicenseNumber: Joi.string()
      .required()
      .label("DriverLicenseNumber")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    DriverLicenseStartDate: Joi.string()
      .required()
      .label("DriverLicenseStartDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    DriverLicenseEndDate: Joi.string()
      .required()
      .label("DriverLicenseEndDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    DriverLicenseFrontImg: Joi.string()
      .required()
      .label("DriverLicenseFrontImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    DriverLicenseBackImg: Joi.string()
      .required()
      .label("DriverLicenseBackImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    ExcAuthNumber: Joi.string()
      .required()
      .label("ExcAuthNumber")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    ExcAuthIssueAuth: Joi.string()
      .required()
      .label("ExcAuthIssueAuth")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    ExcAuthStartDate: Joi.string()
      .required()
      .label("ExcAuthStartDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    ExcAuthEndDate: Joi.string()
      .required()
      .label("ExcAuthEndDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    ExcAuthFrontImg: Joi.string()
      .required()
      .label("ExcAuthFrontImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    ExcAuthBackImg: Joi.string()
      .required()
      .label("ExcAuthBackImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    TypeContract: Joi.string()
      .label("TypeContract")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
  };

  const handleInstructorAddress = (name, value) => {
    let errorMessage = "";
    if (name === "Address") {
      errorMessage = validateSuggest6(name, value.Label);
    } else {
      errorMessage = validateSuggest6(name, value);
    }
    setStep6Errors({ ...step6Errors, [name]: errorMessage });
    setInstructorDetail({ ...instructorDetail, [name]: value });
  };
  const validateSuggest6 = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: step6Schema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  const handleOpenModal = () => {
    setInstructorDetail({
      Firstname: "",
      Surname: "",
      Dob: new Date(),
      Pob: "",
      Gender: "",
      Address: {
        Label: "",
        Zip: "",
        City: "",
        Lat: "",
        Lng: "",
      },
      Complement: "",
      Email: "",
      Email2: "",
      Phone: "",
      Phone2: "",
      Password: "",
      ConfirmPassword: "",
      ProfileImg: "",
      DriverLicenseNumber: "",
      DriverLicenseStartDate: new Date(),
      DriverLicenseEndDate: new Date(),
      DriverLicenseFrontImg: "",
      DriverLicenseBackImg: "",
      ExcAuthNumber: "",
      ExcAuthIssueAuth: "",
      ExcAuthStartDate: new Date(),
      ExcAuthEndDate: new Date(),
      ExcAuthFrontImg: "",
      ExcAuthBackImg: "",
      TypeContract: "",
    });
    setAddInstructor(true);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    overflowX: "scroll",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    mt: 3,
    borderRadius: "4px",
  };
  const onChange = (name, value) => {
    setInstructorDetail({ ...instructorDetail, [name]: value });
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getInstructorData(userData);
    setUser(userData);
  }, [update]);

  const getInstructorData = async (userData) => {
    let allInstructor = [];
    await API("get", `Profile/GetProfileByPersonalId?id=${userData.id}`).then(
      (Dsprofileres) => {
        let instructorId = JSON.parse(
          Dsprofileres.data.data.drivingSchoolInstructorInfoId
        );
        allInstructor = Object.entries(instructorId).map(([key, value]) => {
          return API("get", `Personal/GetAllById/?id=${value}`);
        });
        Promise.all(allInstructor).then((res) => {
          let newInstructor = res.map(async (ins) => {
            if (ins.data.data != null) {
              return await API(
                "get",
                `Profile/GetProfileByPersonalId?id=${ins.data.data.id}`
              ).then((insProfileRes) => {
                let instructor = ins.data.data;
                instructor["name"] =
                  ins.data.data.firstName + " " + ins.data.data.surName;
                instructor["status"] = insProfileRes.data.data.status;

                return instructor;
              });
            }
          });

          Promise.all(newInstructor).then((res) => {
            let items = [];
            res.map((e) => {
              if (e != undefined) {
                items.push(e);
              }
            });
            setInstructorData(items);
            setLoading(false);
          });
        });
      }
    );
  };
  const studentSchema = {
    Address: Joi.string()
      .required()
      .label("Address")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} can't be empty`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  };

  const validateSuggest = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: studentSchema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleInstructorData = (name, value) => {
    let errorMessage = "";
    if (name === "Address") {
      errorMessage = validateSuggest(name, value.label);
    } else {
      errorMessage = validateSuggest(name, value);
    }

    setStudentErrors({ ...studentErrors, [name]: errorMessage });
    setAddress(value);
  };

  const handleSelectAddress = (e) => {
    if (e) {
      handleInstructorData("Address", {
        label: e.label,
        zip: e.PostalCode,
        city: e.city,
        lat: e.lat,
        lng: e.lng,
      });
    } else {
      handleInstructorData("Address", {
        label: "",
        zip: "",
        city: "",
        lat: "",
        lng: "",
      });
    }
  };
  const handleAddress = async (e) => {
    if (e.target.value === "") {
      handleInstructorData("Address", {
        label: "",
        zip: "",
        city: "",
        lat: "",
        lng: "",
      });
      setAddresses([]);
    } else {
      handleInstructorData("Address", { ...address, label: e.target.value });
      var config = {
        method: "get",
        url: `https://api-adresse.data.gouv.fr/search/?q=${e.target.value}&autocomplete=1`,
      };
      axios.defaults.headers = null;
      await axios(config)
        .then((res) => {
          let addressToSet = [];
          res.data.features.map((item) => {
            addressToSet.push({
              label: item.properties.label,
              city: item.properties.city,
              PostalCode: item.properties.postcode,
              lat: item.geometry.coordinates[1],
              lng: item.geometry.coordinates[0],
            });
          });
          setAddresses(addressToSet);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleIns = (name, value) => {
    let errorMessage = "";
    if (name === "Address") {
      errorMessage = validateSuggest(name, value.label);
    } else {
      errorMessage = validateSuggest(name, value);
    }

    setStudentErrors({ ...studentErrors, [name]: errorMessage });
    setInstructorDetail({ ...instructorDetail, [name]: value });
  };
  const handleSelectAddressIns = (e) => {
    if (e) {
      onChange("Address", {
        Label: e.label,
        Zip: e.PostalCode,
        City: e.city,
        Lat: e.lat,
        Lng: e.lng,
      });
    } else {
      onChange("Address", {
        Label: "",
        Zip: "",
        City: "",
        Lat: "",
        Lng: "",
      });
    }
  };

  const handleAddressIns = async (e) => {
    if (e.target.value === "") {
      onChange("Address", {
        Label: "",
        Zip: "",
        City: "",
        Lat: "",
        Lng: "",
      });
      setAddresses([]);
    } else {
      onChange("Address", {
        ...instructorDetail.Address,
        Label: e.target.value,
      });
      var config = {
        method: "get",
        url: `https://api-adresse.data.gouv.fr/search/?q=${e.target.value}&autocomplete=1`,
      };
      axios.defaults.headers = null;

      await axios(config)
        .then(function (res) {
          let addressToSet = [];
          res.data.features.map((item) => {
            addressToSet.push({
              label: item.properties.label,
              city: item.properties.city,
              PostalCode: item.properties.postcode,
              lat: item.geometry.coordinates[1],
              lng: item.geometry.coordinates[0],
            });
          });
          setAddresses(addressToSet);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const addMeetUp = async () => {
    await API("post", `InstructorMeetupPoints`, {
      Address: address.label,
      zip: address.zip,
      city: address.city,
      lat: address.lat,
      lng: address.lng,
      instructorId: user.id,
    }).then((res) => {
      toast.success("Meetup points added successfully");
      setOPenMeetupModal(false);
    });
  };

  const detachInstructor = async (index) => {
    const tempArray = [...instructorData];

    await API("get", `Profile/GetProfileByPersonalId?id=${user.id}`).then(
      async (dsInsres) => {
        let instructorId = JSON.parse(
          dsInsres.data.data.drivingSchoolInstructorInfoId
        );

        let allInstructor = {};
        Object.entries(instructorId).map(async ([key, value], i) => {
          if (tempArray[index].id === value || value === null) {
          } else {
            allInstructor = {
              ...allInstructor,
              ["instructor" + (Object.keys(allInstructor).length + 1)]: value,
            };
          }
        });

        await API("post", `Profile/UpdateProfile`, {
          banDate: dsInsres.data.data.banDate,
          banStatus: dsInsres.data.data.banDate,
          id: dsInsres.data.data.id,
          businessInfoId: dsInsres.data.data.businessInfoId,
          drivingLisenceInfoId: dsInsres.data.data.drivingLisenceInfoId,
          drivingSchoolApprovalInfoId:
            dsInsres.data.data.drivingSchoolApprovalInfoId,
          drivingSchoolIdentityInfoId:
            dsInsres.data.data.drivingSchoolIdentityInfoId,
          drivingSchoolInstructorInfoId:
            Object.keys(allInstructor).length > 0
              ? JSON.stringify(allInstructor)
              : "",
          drivingSchoolManagerInfoId:
            dsInsres.data.data.drivingSchoolManagerInfoId,

          exersiceAuthorizationInfoId:
            dsInsres.data.data.exersiceAuthorizationInfoId,
          insuranceCompanyInfoId: dsInsres.data.data.insuranceCompanyInfoId,
          isAdminBan: dsInsres.data.data.isAdminBan,
          isEmailSent: dsInsres.data.data.isEmailSent,
          lat: dsInsres.data.data.lat,
          long: dsInsres.data.data.long,
          personalInfoId: dsInsres.data.data.personalInfoId,
          personalInfos: dsInsres.data.data.personalInfos,
          role: dsInsres.data.data.role,
          status: dsInsres.data.data.status,
          technicalControlInfoId: dsInsres.data.data.technicalControlInfoId,
          vehicleInsuranceInfoId: dsInsres.data.data.vehicleInsuranceInfoId,
          drivingSchoolVehiclesInfoId:
            dsInsres.data.data.drivingSchoolVehiclesInfoId,
        }).then(async (profileres) => {
          await API(
            "get",
            `Profile/GetProfileByPersonalId?id=${tempArray[index].id}`
          ).then(async (dsInsprofileres) => {
            await API("post", `DrivingLisence`, {
              already_have_license:
                dsInsprofileres.data.data.already_have_license,
              deliveryPlace: dsInsprofileres.data.data.deliveryPlace,
              drivingLisenceImagePath:
                dsInsprofileres.data.data.drivingLisenceImagePath,
              folder: dsInsprofileres.data.data.folder,
              id: dsInsprofileres.data.data.id,
              licenses_for: dsInsprofileres.data.data.licenses_for,
              licenses_type: dsInsprofileres.data.data.licenses_type,
              lisenceNumber: dsInsprofileres.data.data.lisenceNumber,
              obtainingDate: dsInsprofileres.data.data.obtainingDate,
              validityDate: dsInsprofileres.data.data.validityDate,
            }).then(async (drivinglicesnseres) => {
              await API("post", `ExersiceAuthorization`, {
                authorizationDate: dsInsprofileres.data.data.authorizationDate,
                authorizationImagePath:
                  dsInsprofileres.data.data.authorizationImagePath,
                authorizationImagePathBack:
                  dsInsprofileres.data.data.authorizationImagePathBack,
                authorizationNumber:
                  dsInsprofileres.data.data.authorizationNumber,
                expirationDate: dsInsprofileres.data.data.expirationDate,
                folder: dsInsprofileres.data.data.folder,
                id: dsInsprofileres.data.data.id,
                issuingAuthority: dsInsprofileres.data.data.issuingAuthority,
              }).then(async (exersiceAuthorizationres) => {
                await API("post", `Business`, {
                  folder: dsInsprofileres.data.data.folder,
                  id: dsInsprofileres.data.data.id,
                  siretNumber: dsInsprofileres.data.data.siretNumber,
                }).then(async (businessres) => {
                  await API("post", `Profile/UpdateProfile`, {
                    BusinessInfoId: businessres.data.data.id,
                    DrivingLisenceInfoId: drivinglicesnseres.data.data.id,
                    ExersiceAuthorizationInfoId:
                      exersiceAuthorizationres.data.data.id,

                    banDate: dsInsres.data.data.banDate,
                    banStatus: dsInsres.data.data.banDate,
                    id: dsInsres.data.data.id,

                    drivingSchoolApprovalInfoId:
                      dsInsres.data.data.drivingSchoolApprovalInfoId,
                    drivingSchoolIdentityInfoId:
                      dsInsres.data.data.drivingSchoolIdentityInfoId,
                    drivingSchoolInstructorInfoId:
                      Object.keys(allInstructor).length > 0
                        ? JSON.stringify(allInstructor)
                        : "",
                    drivingSchoolManagerInfoId:
                      dsInsres.data.data.drivingSchoolManagerInfoId,

                    exersiceAuthorizationInfoId:
                      dsInsres.data.data.exersiceAuthorizationInfoId,
                    insuranceCompanyInfoId:
                      dsInsres.data.data.insuranceCompanyInfoId,
                    isAdminBan: dsInsres.data.data.isAdminBan,
                    isEmailSent: dsInsres.data.data.isEmailSent,
                    lat: dsInsres.data.data.lat,
                    long: dsInsres.data.data.long,
                    personalInfoId: dsInsres.data.data.personalInfoId,
                    personalInfos: dsInsres.data.data.personalInfos,
                    role: "Instructor",
                    status: dsInsres.data.data.status,
                    technicalControlInfoId:
                      dsInsres.data.data.technicalControlInfoId,
                    vehicleInsuranceInfoId:
                      dsInsres.data.data.vehicleInsuranceInfoId,
                    drivingSchoolVehiclesInfoId:
                      dsInsres.data.data.drivingSchoolVehiclesInfoId,
                  }).then(async (res) => {
                    await API(
                      "get",
                      `Personal/GetAllById/?id=${tempArray[index].id}`
                    ).then(async (getpresonalres) => {
                      await API("post", `Personal/UpdatePersonal`, {
                        absentEndDate: getpresonalres.data.data.absentEndDate,
                        address: getpresonalres.data.data.address,
                        backIDPhoto: getpresonalres.data.data.backIDPhoto,
                        city: getpresonalres.data.data.city,
                        complement: getpresonalres.data.data.complement,
                        contactEmail: getpresonalres.data.data.contactEmail,
                        cpfAccept: getpresonalres.data.data.cpfAccept,
                        T19: getpresonalres.data.data.T19,
                        documentTested: getpresonalres.data.data.documentTested,
                        drivingSchoolID:
                          getpresonalres.data.data.drivingSchoolID,
                        firstName: getpresonalres.data.data.firstName,
                        frontIDPhoto: getpresonalres.data.data.frontIDPhoto,
                        gender: getpresonalres.data.data.gender,
                        giveOurPlatformTime:
                          getpresonalres.data.data.giveOurPlatformTime,
                        highWayCodeDate:
                          getpresonalres.data.data.highWayCodeDate,
                        highWayCodeImage:
                          getpresonalres.data.data.highWayCodeImage,
                        id: getpresonalres.data.data.id,
                        instructorMeetupPointInfos:
                          getpresonalres.data.data.instructorMeetupPointInfos,
                        isOnline: getpresonalres.data.data.isOnline,
                        lastActiveTime: getpresonalres.data.data.lastActiveTime,
                        lastSeen: getpresonalres.data.data.lastSeen,
                        lat: getpresonalres.data.data.lat,
                        long: getpresonalres.data.data.long,
                        noOfHrsWanted: getpresonalres.data.data.noOfHrsWanted,
                        paid: getpresonalres.data.data.paid,
                        password: getpresonalres.data.data.password,
                        phone: getpresonalres.data.data.phone,
                        photo: getpresonalres.data.data.photo,
                        registrationDate:
                          getpresonalres.data.data.registrationDate,
                        role: "Instructor",
                        secondEmail: getpresonalres.data.data.secondEmail,
                        secondPhone: getpresonalres.data.data.secondPhone,
                        spokenLanguage: getpresonalres.data.data.spokenLanguage,
                        surName: getpresonalres.data.data.surName,
                        whichPlatform: getpresonalres.data.data.whichPlatform,
                        workWithOther: getpresonalres.data.data.workWithOther,
                        zip: getpresonalres.data.data.zip,
                      }).then(() => {
                        toast.success("Detach successfully");
                        getInstructorData(user);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      }
    );
  };
  const deleteInstructor = async (index) => {
    const _tempArray = [...instructorData];
    await API("get", `Profile/GetProfileByPersonalId?id=${user.id}`).then(
      async (dsres) => {
        let _instructorId = JSON.parse(
          dsres.data.data.drivingSchoolInstructorInfoId
        );

        let _allInstructor = {};
        Object.entries(_instructorId).map(async ([key, value], i) => {
          if (_tempArray[index].id === value || value === null) {
          } else {
            _allInstructor = {
              ..._allInstructor,
              ["instructor" + (Object.keys(_allInstructor).length + 1)]: value,
            };
          }
        });

        await API("post", `Profile/UpdateProfile`, {
          banDate: dsres.data.data.banDate,
          banStatus: dsres.data.data.banDate,
          id: dsres.data.data.id,
          businessInfoId: dsres.data.data.businessInfoId,
          drivingLisenceInfoId: dsres.data.data.drivingLisenceInfoId,
          drivingSchoolApprovalInfoId:
            dsres.data.data.drivingSchoolApprovalInfoId,
          drivingSchoolIdentityInfoId:
            dsres.data.data.drivingSchoolIdentityInfoId,
          drivingSchoolInstructorInfoId:
            Object.keys(_allInstructor).length > 0
              ? JSON.stringify(_allInstructor)
              : "",
          drivingSchoolManagerInfoId:
            dsres.data.data.drivingSchoolManagerInfoId,

          exersiceAuthorizationInfoId:
            dsres.data.data.exersiceAuthorizationInfoId,
          insuranceCompanyInfoId: dsres.data.data.insuranceCompanyInfoId,
          isAdminBan: dsres.data.data.isAdminBan,
          isEmailSent: dsres.data.data.isEmailSent,
          lat: dsres.data.data.lat,
          long: dsres.data.data.long,
          personalInfoId: dsres.data.data.personalInfoId,
          personalInfos: dsres.data.data.personalInfos,
          role: dsres.data.data.role,
          status: dsres.data.data.status,
          technicalControlInfoId: dsres.data.data.technicalControlInfoId,
          vehicleInsuranceInfoId: dsres.data.data.vehicleInsuranceInfoId,
          drivingSchoolVehiclesInfoId:
            dsres.data.data.drivingSchoolVehiclesInfoId,
        }).then(async (updatedsprofileres) => {
          await API(
            "get",
            `Personal/GetAllById/?id=${_tempArray[index].id}`
          ).then(async (dsInspersonalres) => {
            await API("post", `Personal/UpdatePersonal`, {
              absentEndDate: dsInspersonalres.data.data.absentEndDate,
              address: dsInspersonalres.data.data.address,
              backIDPhoto: dsInspersonalres.data.data.backIDPhoto,
              city: dsInspersonalres.data.data.city,
              complement: dsInspersonalres.data.data.complement,
              contactEmail: dsInspersonalres.data.data.contactEmail,
              cpfAccept: dsInspersonalres.data.data.cpfAccept,
              T19: dsInspersonalres.data.data.T19,
              documentTested: dsInspersonalres.data.data.documentTested,
              drivingSchoolID: dsInspersonalres.data.data.drivingSchoolID,
              firstName: dsInspersonalres.data.data.firstName,
              frontIDPhoto: dsInspersonalres.data.data.frontIDPhoto,
              gender: dsInspersonalres.data.data.gender,
              giveOurPlatformTime:
                dsInspersonalres.data.data.giveOurPlatformTime,
              highWayCodeDate: dsInspersonalres.data.data.highWayCodeDate,
              highWayCodeImage: dsInspersonalres.data.data.highWayCodeImage,
              id: dsInspersonalres.data.data.id,
              instructorMeetupPointInfos:
                dsInspersonalres.data.data.instructorMeetupPointInfos,
              isOnline: dsInspersonalres.data.data.isOnline,
              lastActiveTime: dsInspersonalres.data.data.lastActiveTime,
              lastSeen: dsInspersonalres.data.data.lastSeen,
              lat: dsInspersonalres.data.data.lat,
              long: dsInspersonalres.data.data.long,
              noOfHrsWanted: dsInspersonalres.data.data.noOfHrsWanted,
              paid: dsInspersonalres.data.data.paid,
              password: dsInspersonalres.data.data.password,
              phone: dsInspersonalres.data.data.phone,
              photo: dsInspersonalres.data.data.photo,
              registrationDate: dsInspersonalres.data.data.registrationDate,
              role: "Deleted DsInstructor",
              secondEmail: dsInspersonalres.data.data.secondEmail,
              secondPhone: dsInspersonalres.data.data.secondPhone,
              spokenLanguage: dsInspersonalres.data.data.spokenLanguage,
              surName: dsInspersonalres.data.data.surName,
              whichPlatform: dsInspersonalres.data.data.whichPlatform,
              workWithOther: dsInspersonalres.data.data.workWithOther,
              zip: dsInspersonalres.data.data.zip,
            }).then(async (res) => {
              await API(
                "get",
                `Profile/GetProfileByPersonalId?id=${_tempArray[index].id}`
              ).then(async (insprofileress) => {
                await API("post", `Profile/UpdateProfile`, {
                  banDate: insprofileress.data.data.banDate,
                  banStatus: insprofileress.data.data.banDate,
                  id: insprofileress.data.data.id,
                  businessInfoId: insprofileress.data.data.businessInfoId,
                  drivingLisenceInfoId:
                    insprofileress.data.data.drivingLisenceInfoId,
                  drivingSchoolApprovalInfoId:
                    insprofileress.data.data.drivingSchoolApprovalInfoId,
                  drivingSchoolIdentityInfoId:
                    insprofileress.data.data.drivingSchoolIdentityInfoId,
                  drivingSchoolInstructorInfoId:
                    Object.keys(_allInstructor).length > 0
                      ? JSON.stringify(_allInstructor)
                      : "",
                  drivingSchoolManagerInfoId:
                    insprofileress.data.data.drivingSchoolManagerInfoId,

                  exersiceAuthorizationInfoId:
                    insprofileress.data.data.exersiceAuthorizationInfoId,
                  insuranceCompanyInfoId:
                    insprofileress.data.data.insuranceCompanyInfoId,
                  isAdminBan: insprofileress.data.data.isAdminBan,
                  isEmailSent: insprofileress.data.data.isEmailSent,
                  lat: insprofileress.data.data.lat,
                  long: insprofileress.data.data.long,
                  personalInfoId: insprofileress.data.data.personalInfoId,
                  personalInfos: insprofileress.data.data.personalInfos,
                  role: insprofileress.data.data.role,
                  status: "Deleted",
                  technicalControlInfoId:
                    insprofileress.data.data.technicalControlInfoId,
                  vehicleInsuranceInfoId:
                    insprofileress.data.data.vehicleInsuranceInfoId,
                  drivingSchoolVehiclesInfoId:
                    insprofileress.data.data.drivingSchoolVehiclesInfoId,
                }).then((finalres) => {
                  toast.success("Instructor deleted successfully");
                  getInstructorData(user);
                });
              });
            });
          });
        });
      }
    );
  };
  const handleFileChange = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "ProfileImg") {
        onChange("ProfileImg", res.data.message);
      } else if (e.target.name === "DriverLicenseFrontImg") {
        onChange("DriverLicenseFrontImg", res.data.message);
      } else if (e.target.name === "DriverLicenseBackImg") {
        onChange("DriverLicenseBackImg", res.data.message);
      } else if (e.target.name === "ExcAuthFrontImg") {
        onChange("ExcAuthFrontImg", res.data.message);
      } else if (e.target.name === "ExcAuthBackImg") {
        onChange("ExcAuthBackImg", res.data.message);
      }
    });
  };

  const handleAddInstructor = async () => {
    await API("get", `Profile/GetProfileByPersonalId?id=${user.id}`).then(
      async (Dsprofile) => {
        let allInstructor = {};
        await API("post", `Personal`, {
          firstName: instructorDetail.Firstname,
          surName: instructorDetail.Surname,
          dob: instructorDetail.Dob,
          placeOfBirth: instructorDetail.Pob,
          gender: instructorDetail.Gender,
          ContactEmail: instructorDetail.Email,
          email: instructorDetail.Email,
          secondEmail: instructorDetail.Email2,
          phone: instructorDetail.Phone,
          secondPhone: instructorDetail.Phone2,
          complement: instructorDetail.Complement,
          password: instructorDetail.Password,
          photo: instructorDetail.ProfileImg,
          SpokenLanguage: instructorDetail.languageArray,
          address: instructorDetail.Address.Label,
          zip: instructorDetail.Address.Zip,
          city: instructorDetail.Address.City,
          lat: instructorDetail.Address.Lat,
          long: instructorDetail.Address.Lat,
          Role: "DSInstructor",
        }).then(async (personalres) => {
          await API("post", `DrivingLisence`, {
            drivingLisenceImagePath: instructorDetail.DriverLicenseFrontImg,
            drivingLisenceImagePathBack: instructorDetail.DriverLicenseBackImg,
            lisenceNumber: instructorDetail.DriverLicenseNumber,
            obtainingDate: instructorDetail.DriverLicenseStartDate,
            validityDate: instructorDetail.DriverLicenseEndDate,
          }).then(async (drivinglicenseres) => {
            await API("post", `ExersiceAuthorization`, {
              authorizationDate: instructorDetail.ExcAuthStartDate,
              authorizationImagePath: instructorDetail.ExcAuthFrontImg,
              authorizationImagePathBack: instructorDetail.ExcAuthBackImg,
              authorizationNumber: instructorDetail.ExcAuthNumber,
              expirationDate: instructorDetail.ExcAuthEndDate,
              issuingAuthority: instructorDetail.ExcAuthIssueAuth,
            }).then(async (exersiceAuthorizationres) => {
              await API("post", `Business`, {
                siretNumber: "",
              }).then(async (Businessres) => {
                await API("post", `InstructorMeetupPoints`, {
                  ZipCode: instructorDetail.Address.Zip,
                  city: instructorDetail.Address.City,
                  instructorId: personalres.data.data.id,
                  lat: instructorDetail.Address.Lat,
                  long: instructorDetail.Address.Lng,
                  meetup: instructorDetail.Address.Label,
                }).then(async (InstructorMeetupPointsres) => {
                  allInstructor = JSON.parse(
                    Dsprofile.data.data.drivingSchoolInstructorInfoId
                  );
                  allInstructor = {
                    ...allInstructor,
                    ["Instructor" + (Object.keys(allInstructor).length + 1)]:
                      personalres.data.data.id,
                  };

                  await API("post", `profile`, {
                    PersonalInfoId: personalres.data.data.id,
                    drivingLisenceInfoId: drivinglicenseres.data.data.id,
                    exersiceAuthorizationInfoId:
                      exersiceAuthorizationres.data.data.id,
                    businessInfoId: Businessres.data.data.id,

                    Role: "DSInstructor",
                    status: "Active",
                    drivingSchoolIdentityInfoId:
                      Dsprofile.data.data.drivingSchoolIdentityInfoId,
                    isAdminBan: Dsprofile.data.data.isAdminBan,
                    isEmailSent: Dsprofile.data.data.isEmailSent,
                  }).then(async (DSIprofileRes) => {
                    await API("post", `Profile/UpdateProfile`, {
                      drivingLisenceInfoId: drivinglicenseres.data.data.id,
                      exersiceAuthorizationInfoId:
                        exersiceAuthorizationres.data.data.id,
                      businessInfoId: Businessres.data.data.id,
                      drivingSchoolInstructorInfoId:
                        Object.keys(allInstructor).length > 0
                          ? JSON.stringify(allInstructor)
                          : "",

                      Role: "DrivingSchool",
                      status: "Active",

                      banDate: Dsprofile.data.data.banDate,
                      banStatus: Dsprofile.data.data.banStatus,
                      drivingSchoolApprovalInfoId:
                        Dsprofile.data.data.drivingSchoolApprovalInfoId,
                      // drivingSchoolIdentityInfoId:
                      //   Dsprofile.data.data.drivingSchoolIdentityInfoId,
                      drivingSchoolInsuranceInfoId:
                        Dsprofile.data.data.drivingSchoolInsuranceInfoId,
                      drivingSchoolManagerInfoId:
                        Dsprofile.data.data.drivingSchoolManagerInfoId,
                      drivingSchoolVehiclesInfoId:
                        Dsprofile.data.data.drivingSchoolVehiclesInfoId,
                      id: Dsprofile.data.data.id,
                      insuranceCompanyInfoId:
                        Dsprofile.data.data.insuranceCompanyInfoId,
                      isAdminBan: Dsprofile.data.data.isAdminBan,
                      isEmailSent: Dsprofile.data.data.isEmailSent,
                      lat: Dsprofile.data.data.lat,
                      long: Dsprofile.data.data.long,
                      personalInfos: Dsprofile.data.data.personalInfos,

                      technicalControlInfoId:
                        Dsprofile.data.data.technicalControlInfoId,
                      vehicleDetailInfoId:
                        Dsprofile.data.data.vehicleDetailInfoId,
                      vehicleInsuranceInfoId:
                        Dsprofile.data.data.vehicleInsuranceInfoId,
                      personalInfoId: user.id,
                    }).then((profileres) => {
                      toast.success("Instrcutor added successfully");
                      setAddInstructor(false);
                      setUpdate(!update);
                    });
                  });
                });
              });
            });
          });
        });
      }
    );
  };
  //   const handleAddInstructor = async () => {
  //     let instructorsRes = [];
  //     instructorDetail.map(async (instructor, index) => {
  //       let DSInstructorPersonalPromise = await API(
  //         "post",
  //         "Personal",
  //         {
  //           firstName: instructor.Firstname,
  //           surName: instructor.Surname,
  //           dob: instructor.Dob,
  //           placeOfBirth: instructor.Pob,
  //           gender: instructor.Gender,
  //           ContactEmail: instructor.Email,
  //           email: instructor.Email,
  //           secondEmail: instructor.Email2,
  //           phone: instructor.Phone,
  //           secondPhone: instructor.Phone2,
  //           complement: instructor.Complement,
  //           password: instructor.Password,
  //           photo: instructor.ProfileImg,
  //           SpokenLanguage: languageArray,
  //           address: instructor.Address.Label,
  //           zip: instructor.Address.Zip,
  //           city: instructor.Address.City,
  //           lat: instructor.Address.Lat,
  //           long: instructor.Address.Lat,
  //           Role: "DSInstructor",
  //         }
  //       );
  //   }
  // }
  return (
    <>
      {/* <MobileViewFilters title={t("Instructor")} /> */}
      <div className="Filters">
        <Grid
          container
          spacing={1}
          sx={{ marginTop: "30px", marginLeft: "70px" }}
        >
          <Grid xs={12} sm={12} md={3}>
            <Typography
              sx={{
                marginTop: "20px",
                paddingLeft: "20px",
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 500,
                fontSize: "24px",
                lineHight: "34px",
                /* identical to box height */

                color: "#2A3235",
              }}
            >
              {t("Instructor")}
            </Typography>
          </Grid>
          {/* <Grid xs={3} sm={3} md={2}>
            <MultipleSelectPlaceholder
              value={["All"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={3} sm={3} md={2}>
            <MultipleSelectPlaceholder
              value={["Filter by receiver"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="Start Date"
              value={Startvalue}
              onChange={handleStartdate}
            ></DatePicker>
          </Grid>

          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="End Date"
              // label={["date"]}
              value={Endvalue}
              onChange={handleEnddate}
            ></DatePicker>
          </Grid> */}
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" />
      <div
        style={{
          display: "flex",
          width: "90%",
          justifyContent: "flex-end",
          marginTop: "70px",
        }}
      >
        <AddCircleIcon
          sx={{
            color: "#149e7a",
            transform: "Scale(2)",
          }}
          onClick={handleOpenModal}
        />
      </div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <DataTable
          data={instructorData}
          columns={Instructorcolumns}
          open={setOPenMeetupModal}
          detachInstructor={detachInstructor}
          deleteInstructor={deleteInstructor}
          user={user}
        ></DataTable>
      )}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openMeetupModal}
        onClose={() => setOPenMeetupModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          <Typography sx={{ color: "#110000" }}>Add Meetup Location</Typography>
          <Grid item xs={12} sm={12} md={12}>
            <AutoComplete
              name="Address"
              required={true}
              disabled={disable}
              label="Address"
              value={address.label}
              options={addresses}
              placeholder="Address"
              onChangeAddress={(e) => {
                handleAddress(e);
              }}
              onAddressSelect={(e) => handleSelectAddress(e)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              label="Zip Code"
              required={true}
              name="zip"
              placeholde="712333"
              disabled={true}
              value={address.zip}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              label="City"
              required={true}
              name="city"
              disabled={true}
              placeholder="New york"
              value={address.city}
            ></TextField>
          </Grid>
          <div style={{ marginTop: "2%" }}>
            <Button
              text="Add"
              width="95% !important"
              color="#149e7a"
              borderRadius="10px"
              onClick={addMeetUp}
              // disabled={disabled}
            ></Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={addInstructor}
        onClose={() => setAddInstructor(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          noValidate
          // onSubmit={handleSubmit}
          sx={style_}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="First Name"
                required={true}
                name="Firstname"
                placeholder="John"
                value={instructorDetail.Firstname}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Firstname"] ? true : false}
                ErrorMsg={step6Errors["Firstname"]}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required={true}
                label="Surname"
                name="Surname"
                placeholder="smith"
                value={instructorDetail.Surname}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Surname"] ? true : false}
                ErrorMsg={step6Errors["Surname"]}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                required={true}
                label="Date of Birth"
                name="Dob"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={instructorDetail.Dob}
                maxDate={new Date()}
                onChange={(e) => {
                  onChange("Dob", moment(e).format("YYYY-MM-DDThh:mm:ss"));
                }}
                error={step6Errors["Dob"] ? true : false}
                ErrorMsg={step6Errors["Dob"]}
              ></DatePicker>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required={true}
                label="Place of Birth"
                name="Pob"
                placeholder="France"
                value={instructorDetail.Pob}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Pob"] ? true : false}
                ErrorMsg={step6Errors["Pob"]}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Gender"
                required={true}
                placeholder={t("Male")}
                name="Gender"
                value={instructorDetail.Gender}
                onChange={(e) => onChange("Gender", e.target.value)}
                MenuItem={[
                  { name: t("Male"), value: "Male" },
                  { name: t("Female"), value: "Female" },
                  { name: t("others"), value: "others" },
                ]}
                error={step6Errors["Gender"] ? true : false}
                ErrorMsg={step6Errors["Gender"]}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <AutoComplete
                name="Address"
                required={true}
                disabled={disable}
                label="Address"
                value={instructorDetail.Address.Label}
                options={addresses}
                placeholder="Address"
                onChangeAddress={(e) => {
                  handleAddressIns(e);
                }}
                onAddressSelect={(e) => handleSelectAddressIns(e)}
                error={step6Errors["Address"] ? true : false}
                ErrorMsg={step6Errors["Address"]}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Complement"
                name="Complement"
                placeholder="Text"
                value={instructorDetail.Complement}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                // error={step6Errors['Complement']?true:false}
                // ErrorMsg={step6Errors['Complement']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="City"
                name="City"
                required={true}
                disabled={true}
                type="text"
                placeholder="Enter City"
                value={instructorDetail.Address.City}
                onChange={(e) => {
                  setInstructorDetail({
                    ...instructorDetail,
                    [e.target.name]: e.target.value,
                  });
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Zip Code"
                required={true}
                name="Zip"
                type="number"
                disabled={true}
                value={instructorDetail.Address.Zip}
                onChange={(e) => {
                  setInstructorDetail({
                    ...instructorDetail,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="00000"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required={true}
                label="Email"
                name="Email"
                type="email"
                placeholder="Email"
                value={instructorDetail.Email}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Email"] ? true : false}
                ErrorMsg={step6Errors["Email"]}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Second Email"
                name="Email2"
                type="email"
                placeholder="smart_coolkyo@yahoo.com"
                value={instructorDetail.Email2}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                // error={step6Errors['Email2']?true:false}
                // ErrorMsg={step6Errors['Email2']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Phone"
                name="Phone"
                placeholder="0000000000000"
                type="number"
                required={true}
                value={instructorDetail.Phone}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Phone"] ? true : false}
                ErrorMsg={step6Errors["Phone"]}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                name="Phone2"
                label="Second Phone"
                type="number"
                placeholder="00000000000000"
                value={instructorDetail.Phone2}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                // error={step6Errors['Phone2']?true:false}
                // ErrorMsg={step6Errors['Phone2']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Password"
                required={true}
                name="Password"
                type="password"
                placeholder="**************"
                value={instructorDetail.Password}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Password"] ? true : false}
                ErrorMsg={step6Errors["Password"]}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Confirm Password"
                required={true}
                name="ConfirmPassword"
                type="password"
                placeholder="**************"
                value={instructorDetail.ConfirmPassword}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["ConfirmPassword"] ? true : false}
                ErrorMsg={step6Errors["ConfirmPassword"]}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload Image"
                type="file"
                label="ProfileImg"
                name="ProfileImg"
                value={instructorDetail.ProfileImg.split("_")
                  .slice(1)
                  .join("_")}
                onChange={handleFileChange}
                // error={step6Errors['ProfileImg']?true:false}
                // ErrorMsg={step6Errors['ProfileImg']}
              />
            </Grid>
          </Grid>
          <Divider
            width="100%"
            borderColor="#D5E4E8"
            margin="2% 0px 2% 0px !important"
          />
          <Typography className="Heading1">Driver’s License</Typography>
          <Divider
            width="100%"
            borderColor="#D5E4E8"
            margin="2% 0px 2% 0px !important"
          />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Driver’s License Number"
                required={true}
                name="DriverLicenseNumber"
                placeholder="XXXXX_XXX"
                value={instructorDetail.DriverLicenseNumber}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["DriverLicenseNumber"] ? true : false}
                ErrorMsg={step6Errors["DriverLicenseNumber"]}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of Obtaining"
                required={true}
                name="DriverLicenseStartDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={instructorDetail.DriverLicenseStartDate}
                maxDate={new Date()}
                onChange={(e) => {
                  onChange(
                    "DriverLicenseStartDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step6Errors["DriverLicenseStartDate"] ? true : false}
                ErrorMsg={step6Errors["DriverLicenseStartDate"]}
              ></DatePicker>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="End Date"
                required={true}
                name="DriverLicenseEndDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={instructorDetail.DriverLicenseEndDate}
                minDate={new Date()}
                onChange={(e) => {
                  onChange(
                    "DriverLicenseEndDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step6Errors["DriverLicenseEndDate"] ? true : false}
                ErrorMsg={step6Errors["DriverLicenseEndDate"]}
              ></DatePicker>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload your driving license front side"
                required={true}
                name="DriverLicenseFrontImg"
                type="file"
                label="DriverLicenseFrontImg"
                value={instructorDetail.DriverLicenseFrontImg.split("_")
                  .slice(1)
                  .join("_")}
                onChange={handleFileChange}
                error={step6Errors["DriverLicenseFrontImg"] ? true : false}
                ErrorMsg={step6Errors["DriverLicenseFrontImg"]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                required={true}
                title="Upload your driving license back side"
                name="DriverLicenseBackImg"
                type="file"
                label="DriverLicenseBackImg"
                value={instructorDetail.DriverLicenseBackImg.split("_")
                  .slice(1)
                  .join("_")}
                onChange={handleFileChange}
                error={step6Errors["DriverLicenseBackImg"] ? true : false}
                ErrorMsg={step6Errors["DriverLicenseBackImg"]}
              />
            </Grid>
          </Grid>
          <Divider
            width="100%"
            borderColor="#D5E4E8"
            margin="2% 0px 2% 0px !important"
          />
          <Typography className="Heading1">
            Authorization to Exercise
          </Typography>
          <Divider
            width="100%"
            borderColor="#D5E4E8"
            margin="2% 0px 2% 0px !important"
          />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of the authorization to exercise"
                required={true}
                name="ExcAuthStartDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={instructorDetail.ExcAuthStartDate}
                maxDate={new Date()}
                onChange={(e) => {
                  onChange(
                    "ExcAuthStartDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step6Errors["ExcAuthStartDate"] ? true : false}
                ErrorMsg={step6Errors["ExcAuthStartDate"]}
              ></DatePicker>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Expiration date"
                required={true}
                name="ExcAuthEndDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                minDate={new Date()}
                onChange={(e) => {
                  onChange(
                    "ExcAuthEndDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step6Errors["ExcAuthEndDate"] ? true : false}
                ErrorMsg={step6Errors["ExcAuthEndDate"]}
                value={instructorDetail.ExcAuthEndDate}
              ></DatePicker>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required={true}
                label="Issuing Authority"
                name="ExcAuthIssueAuth"
                placeholder="xxxxxxxxx"
                value={instructorDetail.ExcAuthIssueAuth}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["ExcAuthIssueAuth"] ? true : false}
                ErrorMsg={step6Errors["ExcAuthIssueAuth"]}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Authorization Number"
                required={true}
                name="ExcAuthNumber"
                placeholder="DON.John"
                value={instructorDetail.ExcAuthNumber}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["ExcAuthNumber"] ? true : false}
                ErrorMsg={step6Errors["ExcAuthNumber"]}
              ></TextField>
            </Grid>
          </Grid>
          <div className="DrivingInstrutor">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Upload your authorization front side"
                  required={true}
                  label="ExcAuthFrontImg"
                  name="ExcAuthFrontImg"
                  type="file"
                  value={instructorDetail.ExcAuthFrontImg.split("_")
                    .slice(1)
                    .join("_")}
                  onChange={handleFileChange}
                  error={step6Errors["ExcAuthFrontImg"] ? true : false}
                  ErrorMsg={step6Errors["ExcAuthFrontImg"]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Upload your authorization back side"
                  label="ExcAuthBackImg"
                  required={true}
                  name="ExcAuthBackImg"
                  type="file"
                  value={instructorDetail.ExcAuthBackImg.split("_")
                    .slice(1)
                    .join("_")}
                  onChange={handleFileChange}
                  error={step6Errors["ExcAuthBackImg"] ? true : false}
                  ErrorMsg={step6Errors["ExcAuthBackImg"]}
                />
              </Grid>
            </Grid>
          </div>
          <Divider
            width="100%"
            borderColor="#D5E4E8"
            margin="2% 0px 2% 0px !important"
          />
          <Typography className="Heading1">
            Type Of Contract With Driving School
          </Typography>
          <Typography className="HeadingContent">
            <RadioGroup
              defaultValue="Employee"
              name="radio-buttons-group"
              style={{
                display: "flex",
              }}
            >
              <FormControlLabel
                value="Employee"
                control={<Radio />}
                label="Employee"
              />
              <FormControlLabel
                value="External Provider"
                control={<Radio />}
                label="External Provider"
              />
            </RadioGroup>
          </Typography>
          <Divider
            width="100%"
            borderColor="#D5E4E8"
            margin="2% 0px 2% 0px !important"
          />

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Button
              text="Add"
              buttonLableStyle="btn_main"
              style={{ marginTop: "24px", marginRight: "10px" }}
              width="10%"
              customWidth1="100%"
              height="48px"
              height2="48px"
              onClick={handleAddInstructor}
              // disabled={
              //   step6Errors.Firstname === null &&
              //   step6Errors.Surname === null &&
              //   step6Errors.Pob === null &&
              //   step6Errors.Gender === null &&
              //   step6Errors.Email === null &&
              //   step6Errors.Phone === null &&
              //   step6Errors.Password === null &&
              //   step6Errors.ConfirmPassword === null &&
              //   step6Errors.DriverLicenseNumber === null &&
              //   step6Errors.DriverLicenseFrontImg === null &&
              //   step6Errors.DriverLicenseBackImg === null &&
              //   step6Errors.ExcAuthNumber === null &&
              //   step6Errors.ExcAuthIssueAuth === null &&
              //   step6Errors.ExcAuthFrontImg === null &&
              //   step6Errors.ExcAuthBackImg === null &&
              //   step6Errors.Dob === null &&
              //   step6Errors.DriverLicenseStartDate === null &&
              //   step6Errors.DriverLicenseEndDate === null &&
              //   step6Errors.ExcAuthStartDate === null &&
              //   step6Errors.ExcAuthEndDate === null &&
              //   step6Errors.Address === null &&
              //   instructorDetail.Address.City != "" &&
              //   instructorDetail.Address.Zip != ""
              //     ? // && step6Errors.Complement===null
              //       // && step6Errors.Email2===null
              //       // && step6Errors.Phone2===null
              //       // && step6Errors.ProfileImg===null
              //       // && step6Errors.TypeContract===null
              //       false
              //     : true
              // }
            ></Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Index;
