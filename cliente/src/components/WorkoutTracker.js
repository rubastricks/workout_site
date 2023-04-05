import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import AuthService from "../services/auth.service";
import Navbar from "./Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import WorkoutForm from "./WorkoutForm";
import UserSearcherBar from "./UserSearcherBar";
import UserExercises from "./UserExercises";

// Material UI
import { Stack, Box } from "@mui/system";
import { Typography } from "@mui/material";

function WorkoutTracker() {
  const [parsedData, setParsedData] = useState("");
  const [firstName, setfirstName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showCode, setShowCode] = useState(false);
  const [showDefaultDate, setShowDefaultDate] = useState(false);
  const { jwt, setJwt } = useContext(MainContext);
  const [isPastDateSelected, setIsPastDateSelected] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  const navigate = useNavigate();

  // User information
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

  // Calendar Value
  const handleCalendarClick = (value) => {
    console.log("Selected date:", value);

    setDate(value);
    setShowCode(true);
    setShowDefaultDate(true);

    const currentDate = new Date();
    const isPastDate =
      value.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0);
    setIsPastDateSelected(isPastDate);
  };

  return (
    <div>
      <Navbar />
      <Stack sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            mt: "10%",
            color: "white",
          }}
        >
          <Typography variant="h4" component="h2" sx={{ mb: "20%" }}>
            {firstName} , Select Day and Workout
          </Typography>

          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={handleCalendarClick}
          />
          {showDefaultDate && (
            <div className="deafaultdate">
              <span style={{ marginLeft: "16%" }}>Default selected date:</span>{" "}
              {date.toDateString()}
            </div>
          )}
          {showCode && (
            <WorkoutForm
              isPastDateSelected={isPastDateSelected}
              selectedDate={date.toISOString().split("T")[0]}
            />
          )}
          {showCode && (
            <UserSearcherBar
              setExercises={setExercises}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
          )}
          {showCode && (
            <UserExercises
              setExercises={setExercises}
              exercises={exercises}
              bodyPart={bodyPart}
            />
          )}
        </Box>
      </Stack>
    </div>
  );
}

export default WorkoutTracker;
