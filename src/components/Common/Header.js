import React from "react";
import Logo from "../../assets/images/logo.svg";
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

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const history = useHistory();
  const handleLogin = () => history.push("/student/myProfille");
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
  const [Loginopen, setLoginOpen] = React.useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  return (
    <div className="main-list">
      <div className="flex_rowAlign_center">
        <a href="http://localhost:3000">
          <img className="home-logo img-fluid w-75" src={Logo} alt="" />
        </a>
        <Typography variant="p" className="logo_title">
          PERMISPOP
        </Typography>
        <ul className="list mt-2 text-center">
          <li>
            <ul>
              <li>
                <a href="http://localhost:3000/#home"> Home </a>
              </li>
              <li>
                <a href="http://localhost:3000/#services"> Services </a>
              </li>
              <li>
                <a href="http://localhost:3000/#contactUs"> Contact Us </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="flex_rowAlign_spacebwt">
        <Search></Search>
        <Divider
          orientation="vertical"
          light={true}
          flexItem
          variant="middle"
          sx={{ margin: "10px" }}
          className={"divider"}
        />
        <Button
          type="submit"
          text="Login"
          buttonLableStyle="btn_main"
          onClick={handleLoginOpen}
        ></Button>
        <BasicModal
          open={Loginopen}
          closebtn={true}
          onClose={handleLoginClose}
          modalTitle="Login to your account"
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
                      placeholder="Enter email"
                      variant="outlined"
                      margin="dense"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
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
                  I read and agree to
                </Typography>
                <Link href="#" variant="body2" className="termsandconditions">
                  {"Terms & Conditions"}
                </Link>
              </Grid>
            </Grid>
            <div className="LoginModalButton">
              <Button
                type="submit"
                text="Login"
                buttonLableStyle="btn_main"
                width="250px"
                height="50px"
                onClick={handleLogin}
              ></Button>
            </div>
            <Grid item className="Register_now">
              <div className="account">
                <Typography>Don’t have an account?</Typography>
              </div>
              <Link href="#" variant="body2">
                {"Register now"}
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
          <MenuItem onClick={handleClose}>Home</MenuItem>
          <MenuItem onClick={handleClose}>Services</MenuItem>
          <MenuItem onClick={handleClose}>Contact Us</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
