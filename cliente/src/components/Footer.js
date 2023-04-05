import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import Logo from "../assets/images/Logo.png";

const Footer = () => {
  return (
    <Box mt="90px" bgcolor="#165876">
      <Stack gap="0px" alignItems="center" pb="22px" pt="10px">
        <img src={Logo} alt="Logo" width="120px" height="80px" />
        <Typography variant="h8" pb="30px" mt="10px">
          Made By Alisson Rubas &copy;{" "}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
