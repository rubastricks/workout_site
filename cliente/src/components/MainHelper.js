import React, { useState } from "react";
import { Box } from "@mui/material";

import Exercises from "../components/Exercises";
import UserSearcherBar from "./UserSearcherBar";

const MainHelper = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const searchedExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <UserSearcherBar
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />

      <Exercises
        setExercises={setExercises}
        exercises={searchedExercises} // Pass the searchedExercises array to the Exercises component
        bodyPart={bodyPart}
      />
    </Box>
  );
};

export default MainHelper;
