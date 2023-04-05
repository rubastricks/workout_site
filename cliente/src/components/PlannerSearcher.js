import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

const PlannerSearcher = () => {
  return (
    <div className="searcher">
      <Stack alignItems="center" justifyContent="center">
        <Box position="relative">
          <TextField
            height="76px"
            sx={{
              input: { fontWeight: "700", border: "none", borderRadius: "4px" },
              width: { lg: "350px", xs: "350px" },
              backgroundColor: "#fff",
              borderRadius: "40px",
            }}
            placeholder="Search Exercises"
            type="text"
          />
          <Button
            className="search-btn"
            sx={{
              bgcolor: "#FF2625",
              color: "#fff",
              textTransform: "none",
              width: { lg: "70px", xs: "80px" },
              height: "56px",
              position: "absolute",
              right: "0px",
              fontSize: { lg: "20px", xs: "14px" },
            }}
          >
            Search
          </Button>
        </Box>
      </Stack>
    </div>
  );
};

export default PlannerSearcher;
