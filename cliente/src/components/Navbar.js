import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../context/MainContext";
import { useNavigate, Link } from "react-router-dom";

// Material UI
import { Stack } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Calculator from "./Calculator";
import Logo from "../assets/images/Logo.png";
import { Box } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import AuthService from "../services/auth.service";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [parsedData, setParsedData] = useState("");
  const { jwt, setJwt } = useContext(MainContext);
  const navigate = useNavigate();

  // Logout the user
  const logout = () => {
    AuthService.logout();
    setJwt("");
    return navigate("/");
  };

  useEffect(() => {
    try {
      return setParsedData(JSON.parse(atob(jwt.split(".")[1])));
    } catch (error) {
      AuthService.logout();
      setJwt("");
      return navigate("/login");
    }
  }, [jwt, navigate, setJwt]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      sx={{
        gap: { sm: "122px", xs: "40px" },
        mt: { sm: "32px", xs: "20px" },
        justifyContent: "none",
      }}
      px="20px"
    >
      <Link to="/">
        <img
          src={Logo}
          alt="logo"
          style={{ width: "120px", height: "55px", margin: "0 20px" }}
        />
      </Link>
      <Stack
        direction="row"
        gap="40px"
        fontFamily="robot"
        fontSize="24px"
        alignItems="flex-end"
      >
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            color: "#fff",
            borderBottom: "3px solid #FF2625",
          }}
        >
          Home
        </Link>
        <a href="#exercises" style={{ textDecoration: "none", color: "#fff" }}>
          Exercises
        </a>

        <Link
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{
            textDecoration: " none",
            color: "#fff",
          }}
        >
          For You
        </Link>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setModalOpen(true);
            }}
          >
            BMI Calculator
          </MenuItem>
          <Link
            to="/workoutTracker"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem onClick={handleClose}>Workout Tracker</MenuItem>
          </Link>
          <MenuItem onClick={() => logout()}>Logout</MenuItem>
        </Menu>
        <Dialog
          sx={{
            color: "transparent",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={modalOpen}
          onClose={handleCloseModal}
        >
          <Box>
            <Calculator setOpenModal={setModalOpen} />
          </Box>
        </Dialog>
      </Stack>
    </Stack>
  );
}

export default Navbar;
