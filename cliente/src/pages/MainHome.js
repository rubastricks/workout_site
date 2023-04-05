import React from "react";
import Logo from "../assets/images/Logo.png";
import Video from "../assets/video/workout.mp4";

import { Box, Typography, Button } from "@mui/material";

const MainHome = () => {
  return (
    <Box>
      <img
        src={Logo}
        alt="logo"
        style={{
          width: "120px",
          height: "55px",
          margin: "0 25px",
          marginTop: "20px",
          position: "absolute",
        }}
      />

      <Box>
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1",
          }}
        >
          <source src={Video} />
        </video>

        <Box
          sx={{
            mt: { lg: "70px", xs: "70px" },
            ml: { sm: "50px" },
          }}
          position="absolute"
          bottom="70px"
        >
          <Typography
            className="ssr"
            color="#fff"
            fontWeight={700}
            sx={{ fontSize: { lg: "44px", xs: "40px" } }}
            mb="23px"
          >
            Sweat, Smile <br />
            And Repeat
          </Typography>
          <Typography
            className="ssr"
            color="#fff"
            fontSize="22px"
            fontFamily="Alegreya"
            lineHeight="35px"
            mb={2}
          >
            Check out the most effective exercises personalized to you
          </Typography>

          <Button
            className="ssar"
            variant="contained"
            color="error"
            href="signup"
            sx={{ backGroundColor: "#FF2625", padding: "px" }}
          >
            Explore New Workouts
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainHome;
