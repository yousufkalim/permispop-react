import React from "react";
import Logo from "../../assets/Logo/v.png";
// import email from "../../assets/images/email.svg";
import { ReactComponent as Email } from "../../assets/images/email.svg";
import { ReactComponent as Lock } from "../../assets/images/lockimg.svg";
import Button from "../Common/Button";
import Search from "../Common/Search";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import BasicModal from "./BasicModal";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import { Grid } from "@mui/material";
import API from "../../api/index";
import jwt_decode from "jwt-decode";
import { Base64 } from "js-base64";
import { toast } from "react-toastify";
import { frontUrl } from "../../config";
import RegisterModal from "../Landing/RegisterModal";
import { useTranslation } from "react-i18next";
import flag_01 from "../../assets/DrawerIcons/flag_01.svg";
import flag_02 from "../../assets/DrawerIcons/flag_02.svg";

export default function Header(props) {
  const { i18n, t } = useTranslation();
  const [Loginopen, setLoginOpen] = React.useState(false);
  const [Registeropen, setRegisteropen] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const history = useHistory();
  const [role, setRole] = React.useState("");
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const handleRegisterOpen = () => {
    setLoginOpen(false);
    setRegisteropen(true);
  };
  const handleRegisterClose = () => setRegisteropen(false);
  let data = {
    Email: email,
    Password: values.password,
  };

  const handleLogin = async () => {
    setDisable(true);
    const response = await API("post", "Personal/Login", data)
      .then(async (response) => {
        if (response.data.data !== null) {
          localStorage.setItem("token", response.data.data);
          if (response.data.data) {
            var decoded = jwt_decode(response.data.data);
            let userdata = JSON.parse(Base64.decode(decoded.userData));
            setRole(userdata.role);

            if (userdata.role === "DSInstructor") {
              setDisable(false);
              history.push("/DsInstructor/myProfile");
            } else if (userdata.role === "CarRentalAgent") {
              setDisable(false);
              history.push("/CarRental/myProfile");
            } else if (userdata.role === "Instructor") {
              setDisable(false);
              history.push("/Instructor/myProfile");
            } else if (userdata.role === "Student") {
              setDisable(false);
              history.push("student/myProfile");
            } else if (userdata.role === "DrivingSchool") {
              setDisable(false);
              history.push("/DrivingSchool/myProfile");
            }
          }
          setDisable(false);
          window.location.reload(false);
        } else {
          // localStorage.removeItem("token");
          setDisable(false);
          toast.error(t("Email or Password is not correct"));
        }
      })
      .catch((error) => {
        setDisable(false);
        console.log(error);
        toast.error(t("Something Went Wrong"));
      });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="main-list">
      <div className="flex_rowAlign_center">
        <a href={frontUrl}>
          <img className="home-logo img-fluid w-75" src={Logo} alt="" />
        </a>
        <Typography variant="p" className="logo_title">
          PERMISPOP
        </Typography>
        <ul className="list mt-2 text-center">
          <li>
            <ul>
              <li>
                <a href={frontUrl + "#home"}> {t("Home")} </a>
              </li>
              <li>
                <a href={frontUrl + "#services"}> {t("Services")} </a>
              </li>
              <li>
                <a href={frontUrl + "#contactUs"}> {t("Contact Us")} </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="flex_rowAlign_spacebwt">
        {/* <Search></Search> */}
        {/* <Divider
          orientation="vertical"
          light={true}
          flexItem
          variant="middle"
          sx={{ margin: "10px" }}
          className={"divider"}
        /> */}
        <Button
          type="submit"
          text={t("Login")}
          buttonLableStyle="btn_main"
          width="20%"
          onClick={handleLoginOpen}
        ></Button>

        <IconButton
          className="flag01"
          onClick={() => i18n.changeLanguage("en")}
        >
          <img alt="America" src={flag_01} className="flags-appbar langFlags" />
        </IconButton>
        <IconButton
          className="flag02"
          onClick={() => i18n.changeLanguage("fr")}
        >
          <img alt="Russia" src={flag_02} className="flags-appbar langFlags" />
        </IconButton>

        <BasicModal
          open={Loginopen}
          closebtn={true}
          onClose={handleLoginClose}
          modalTitle={t("Login to your account")}
          modalTitleProps={{
            align: "left",
            // marginTop: "10px",
            // marginBottom: "5px",
            marginLeft: "50px",
            color: "#2F363D",
            fontWeight: 600,
            fontSize: "25px",
          }}
        >
          <>
            <Grid container spacing={1} className="login_div">
              <div className="Login_text_field">
                <Grid sx={12} sm={12} md={12}>
                  <FormControl>
                    <TextField
                      className="Loginmodal"
                      id="outlined-basic"
                      placeholder={t("Enter email")}
                      variant="outlined"
                      margin="dense"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid sx={12} sm={12} md={12}>
                  <FormControl>
                    <OutlinedInput
                      className="Loginmodal"
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      placeholder="Password"
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock></Lock>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </div>
            </Grid>
            <Grid className="termsConditionsCheckboxContainer1">
              <Grid
                sx={12}
                sm={12}
                md={12}
                className="termsConditionsCheckbox1"
              >
                <Checkbox defaultChecked className="checkbox" />
                <Typography
                  variant="body1"
                  className="termsConditionsCheckboxTitle1"
                >
                  {t("I read and agree to")}
                </Typography>
                <Link href="#" variant="body2" className="termsandconditions">
                  {t("Terms & Conditions")}
                </Link>
              </Grid>
            </Grid>
            <div className="LoginModalButton">
              <Button
                type="submit"
                text={t("Login")}
                buttonLableStyle="btn_main"
                padding="0 30% 0 30% !important"
                height="50px"
                onClick={handleLogin}
                disabled={disable}
              ></Button>
            </div>
            <Grid item className="Register_now">
              <div className="account">
                <Typography>{t("Don’t have an account?")}</Typography>
              </div>
              <Link href="#" variant="body2" onClick={handleRegisterOpen}>
                {t("Register now")}
              </Link>
            </Grid>
          </>
        </BasicModal>
        <div className="burger_btn">
          <IconButton
            color="inherit"
            edge="start"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
        <Menu
          className="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem>
            <a href={frontUrl + "#home"} style={{ textDecoration: "none" }}>
              {t("Home")}
            </a>
          </MenuItem>
          <MenuItem>
            <a href={frontUrl + "#services"} style={{ textDecoration: "none" }}>
              {t("Services")}
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href={frontUrl + "#contactUs"}
              style={{ textDecoration: "none" }}
            >
              {t("Contact Us")}
            </a>
          </MenuItem>
        </Menu>
      </div>
      <RegisterModal
        open={Registeropen}
        closebtn={true}
        onClose={handleRegisterClose}
        modalTitle={t("Register As")}
        modalboxclassName="Register_modal"
        modalTitleclassName="Register_title"
      ></RegisterModal>
    </div>
  );
}
