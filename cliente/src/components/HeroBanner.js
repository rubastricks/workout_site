import React, { useEffect, useState, useContext } from "react";
import { MainContext } from "../context/MainContext";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

import HeroBannerImage from "../assets/images/banner.png";

const HeroBanner = () => {
  const [parsedData, setParsedData] = useState("");
  const [firstName, setfirstName] = useState("");
  const navigate = useNavigate();
  const { jwt, setJwt } = useContext(MainContext);

  useEffect(() => {
    try {
      const decodedJwt = JSON.parse(atob(jwt.split(".")[1]));
      setParsedData(decodedJwt);
      setfirstName(decodedJwt.firstName);
    } catch (error) {
      AuthService.logout();
      setJwt("");
      return navigate("/");
    }
  }, [jwt, navigate, setJwt]);

  return (
    <Box>
      <Box
        sx={{ mt: { lg: "212px", xs: "70px" }, ml: { sm: "50px" } }}
        position="relative"
        p="20px"
      >
        <Typography color="#FF2625" fontWeight="600" fontSize="26px">
          Welcome {firstName}!
        </Typography>
        <Typography
          color="#fff"
          fontWeight={700}
          sx={{ fontSize: { lg: "35px", xs: "40px" } }}
          mb="23px"
          mt="30px"
        >
          Transform Your Body, Mind, <br />
          and Spirit!
        </Typography>

        <Typography
          color="#fff"
          fontSize="22px"
          fontFamily="Alegreya"
          lineHeight="35px"
          mb={6}
        >
          Let's unleash your full potential and achieve your best self,
          together!
        </Typography>
        <Button
          variant="contained"
          color="error"
          href="#exercises"
          sx={{ backGroundColor: "#FF2625", padding: "8px" }}
        >
          Explore New Workouts
        </Button>

        <Typography
          fontWeight={600}
          color="#ffff"
          sx={{
            opacity: "0.1",
            display: { lg: "block", xs: "none" },
            fontSize: "160px",
          }}
        >
          Exercise
        </Typography>
        <img
          src={HeroBannerImage}
          alt="hero-banner"
          className="hero-banner-img"
        />
      </Box>
    </Box>
  );
};

export default HeroBanner;
