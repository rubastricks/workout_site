import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import AuthService from "../services/auth.service";

//Material UI
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      contrastText: "#fff",
    },
  },
});

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { jwt, setJwt } = useContext(MainContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const loading = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const navigate = useNavigate();

  const alertToggle = async (msg) => {
    setAlertText(msg);
    setShowAlert(true);
    await loading(4000);
    setShowAlert(false);
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = {
        username,
        password,
        firstName,
        lastName,
      };
      console.log("user", user);
      const response = await AuthService.signup(user);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setJwt(token);
      const confirmationMessage = `Dear ${firstName} ${lastName}, your account has been successfully created!`;
      alertToggle(confirmationMessage);
      navigate("/home");
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        alertToggle(error.response.data.error);
      } else {
        alertToggle("An error occurred.");
      }
    }
  };

  useEffect(() => {
    if (jwt || jwt !== "") {
      return navigate("/home");
    }
  }, [jwt, setJwt, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          backgroundColor: "white",
          borderRadius: "10px 10px 10px",
        }}
      >
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
            <FitnessCenterRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Email"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </Grid>
            {showAlert ? <Alert severity="warning">{alertText}</Alert> : null}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 4 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center" sx={{ mb: 2 }}>
              <Grid item>
                <Link to="/login" variant="body2">
                  {" "}
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
