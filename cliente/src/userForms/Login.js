import * as React from "react";
import { useState, useContext, useEffect } from "react";
import AuthServices from "../services/auth.service";
import { MainContext, MainContextProvider } from "../context/MainContext";
import { Link, useNavigate } from "react-router-dom";

//Materia UI
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

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { jwt, setJwt } = useContext(MainContext);
  const loading = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const navigate = useNavigate();

  const alertToggle = async (msg) => {
    setAlertText(msg);
    setShowAlert(true);
    await loading(3000);
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
      };
      console.log("user", user);
      const response = await AuthServices.login(user);
      console.log("response", response.data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setJwt(token);
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
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
  }, [jwt, navigate]);

  return (
    <div>
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
              Sign in
            </Typography>
            <form noValidate onSubmit={(e) => handleSubmit(e)}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="email"
                name="username"
                autoComplete="username"
                value={username}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
              {showAlert ? <Alert severity="warning">{alertText}</Alert> : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 4 }}
              >
                Sign In
              </Button>
              <Grid container sx={{ mt: 2, mb: 2, ml: 8 }}>
                <Grid item>
                  <Link to="/signup">Don't have an account? Sign Up Now!</Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Login;
